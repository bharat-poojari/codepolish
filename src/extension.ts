import * as vscode from 'vscode';
import * as jsBeautify from 'js-beautify';

export function activate(context: vscode.ExtensionContext) {
    console.log('CodePolish activated!');

    // Beautify Command
    let beautifyCmd = vscode.commands.registerCommand('codepolish.beautify', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No editor found');
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        let text: string;
        let range: vscode.Range;
        
        if (selection.isEmpty) {
            text = document.getText();
            range = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
        } else {
            text = document.getText(selection);
            range = selection;
        }

        let formatted = text;
        const langId = document.languageId;

        try {
            switch (langId) {
                case 'html':
                case 'vue':
                    formatted = beautifyHTML(text);
                    break;
                case 'css':
                case 'scss':
                case 'less':
                    formatted = beautifyCSS(text);
                    break;
                case 'javascript':
                    formatted = beautifyJavaScript(text);
                    break;
                case 'javascriptreact':
                    formatted = beautifyJSX(text);
                    break;
                case 'typescript':
                    formatted = beautifyTypeScript(text);
                    break;
                case 'typescriptreact':
                    formatted = beautifyTSX(text);
                    break;
                case 'json':
                    formatted = beautifyJSON(text);
                    break;
                case 'jsonl':
                    formatted = beautifyJSONL(text);
                    break;
                case 'xml':
                case 'svg':
                    formatted = beautifyXML(text);
                    break;
                case 'yaml':
                    formatted = beautifyYAML(text);
                    break;
                case 'graphql':
                    formatted = beautifyGraphQL(text);
                    break;
                case 'php':
                    formatted = beautifyPHP(text);
                    break;
                case 'markdown':
                    formatted = beautifyMarkdown(text);
                    break;
                case 'sql':
                    formatted = beautifySQL(text);
                    break;
                case 'dockerfile':
                case 'dockercompose':
                    formatted = beautifyDocker(text);
                    break;
                case 'env':
                    formatted = beautifyENV(text);
                    break;
                case 'toml':
                    formatted = beautifyTOML(text);
                    break;
                default:
                    // Try JavaScript formatting as fallback
                    formatted = beautifyJavaScript(text);
            }
        } catch (e) {
            console.error('Format error:', e);
            vscode.window.showErrorMessage(`Beautify error: ${e}`);
            return;
        }

        if (formatted !== text) {
            editor.edit(editBuilder => {
                editBuilder.replace(range, formatted);
            }).then((success: boolean) => {
                if (success) {
                    vscode.window.showInformationMessage('✨ Code beautified successfully!');
                }
            });
        } else {
            vscode.window.showInformationMessage('✓ Code is already properly formatted');
        }
    });

    // Minify Command
    let minifyCmd = vscode.commands.registerCommand('codepolish.minify', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No editor found');
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        let text: string;
        let range: vscode.Range;
        
        if (selection.isEmpty) {
            text = document.getText();
            range = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
        } else {
            text = document.getText(selection);
            range = selection;
        }

        let minified = text;
        const langId = document.languageId;

        try {
            switch (langId) {
                case 'html':
                case 'vue':
                    minified = minifyHTML(text);
                    break;
                case 'css':
                case 'scss':
                case 'less':
                    minified = minifyCSS(text);
                    break;
                case 'javascript':
                    minified = minifyJavaScript(text);
                    break;
                case 'javascriptreact':
                    minified = minifyJSX(text);
                    break;
                case 'typescript':
                    minified = minifyTypeScript(text);
                    break;
                case 'typescriptreact':
                    minified = minifyTSX(text);
                    break;
                case 'json':
                case 'jsonl':
                    minified = minifyJSON(text);
                    break;
                case 'xml':
                case 'svg':
                    minified = minifyXML(text);
                    break;
                case 'yaml':
                    minified = minifyYAML(text);
                    break;
                case 'graphql':
                    minified = minifyGraphQL(text);
                    break;
                case 'php':
                    minified = minifyPHP(text);
                    break;
                case 'markdown':
                    minified = minifyMarkdown(text);
                    break;
                case 'sql':
                    minified = minifySQL(text);
                    break;
                case 'dockerfile':
                case 'dockercompose':
                    minified = minifyDocker(text);
                    break;
                case 'env':
                    minified = minifyENV(text);
                    break;
                case 'toml':
                    minified = minifyTOML(text);
                    break;
                default:
                    minified = minifyJavaScript(text);
            }
        } catch (e) {
            console.error('Minify error:', e);
            vscode.window.showErrorMessage(`Minify error: ${e}`);
            return;
        }

        if (minified !== text) {
            editor.edit(editBuilder => {
                editBuilder.replace(range, minified);
            }).then((success: boolean) => {
                if (success) {
                    vscode.window.showInformationMessage('📦 Code minified successfully!');
                }
            });
        } else {
            vscode.window.showInformationMessage('✓ Code is already minified');
        }
    });

    context.subscriptions.push(beautifyCmd, minifyCmd);
}

// ==================== BEAUTIFY FUNCTIONS ====================

function beautifyHTML(code: string): string {
    return jsBeautify.html_beautify(code, {
        indent_size: 4,
        wrap_line_length: 120,
        preserve_newlines: true,
        max_preserve_newlines: 1,
        unformatted: ['pre', 'textarea', 'code'],
        content_unformatted: ['pre', 'textarea', 'code']
    });
}

function beautifyCSS(code: string): string {
    return jsBeautify.css_beautify(code, {
        indent_size: 4,
        selector_separator_newline: true,
        newline_between_rules: true,
        space_around_combinator: true
    });
}

function beautifyJavaScript(code: string): string {
    return jsBeautify.js_beautify(code, {
        indent_size: 4,
        space_in_empty_paren: true,
        preserve_newlines: true,
        max_preserve_newlines: 1,
        brace_style: 'collapse',
        jslint_happy: false,
        end_with_newline: true
    });
}

function beautifyJSX(code: string): string {
    // JSX beautification - safely format without breaking JSX syntax
    try {
        return jsBeautify.html_beautify(code, {
            indent_size: 4,
            wrap_line_length: 120,
            preserve_newlines: true,
            max_preserve_newlines: 1,
            indent_inner_html: true,
            unformatted: [],
            content_unformatted: [],
            indent_scripts: 'keep',
            wrap_attributes: 'auto',
            wrap_attributes_indent_size: 4,
            end_with_newline: true
        });
    } catch {
        // Fallback: use JS beautify which handles JSX reasonably
        return jsBeautify.js_beautify(code, {
            indent_size: 4,
            space_in_empty_paren: false,
            preserve_newlines: true,
            max_preserve_newlines: 1,
            brace_style: 'collapse',
            end_with_newline: true
        });
    }
}

function beautifyTypeScript(code: string): string {
    return jsBeautify.js_beautify(code, {
        indent_size: 4,
        space_in_empty_paren: true,
        preserve_newlines: true,
        max_preserve_newlines: 1,
        brace_style: 'collapse',
        jslint_happy: true,
        end_with_newline: true
    });
}

function beautifyTSX(code: string): string {
    return beautifyJSX(code);
}

function beautifyJSON(code: string): string {
    try {
        const obj = JSON.parse(code);
        return JSON.stringify(obj, null, 4);
    } catch {
        return code;
    }
}

function beautifyJSONL(code: string): string {
    return code.split('\n')
        .map(line => {
            try {
                return JSON.stringify(JSON.parse(line.trim()), null, 4);
            } catch {
                return line;
            }
        })
        .join('\n');
}

function beautifyXML(code: string): string {
    let formatted = '';
    let indent = 0;
    
    const tokens = code.match(/<\/?[\w:.-]+(?:\s+[\w:.-]+=(?:"[^"]*"|'[^']*'))*\s*\/?>|<!--[\s\S]*?-->|[^<]+/g) || [];
    
    for (const token of tokens) {
        const trimmed = token.trim();
        if (!trimmed) continue;
        
        if (trimmed.startsWith('<!--')) {
            formatted += '    '.repeat(indent) + trimmed + '\n';
        } else if (trimmed.startsWith('</')) {
            indent = Math.max(0, indent - 1);
            formatted += '    '.repeat(indent) + trimmed + '\n';
        } else if (trimmed.startsWith('<?') || trimmed.startsWith('<!')) {
            formatted += '    '.repeat(indent) + trimmed + '\n';
        } else if (trimmed.startsWith('<') && trimmed.endsWith('/>')) {
            formatted += '    '.repeat(indent) + trimmed + '\n';
        } else if (trimmed.startsWith('<')) {
            formatted += '    '.repeat(indent) + trimmed + '\n';
            if (!trimmed.includes('</')) {
                indent++;
            }
        } else {
            formatted += '    '.repeat(indent) + trimmed + '\n';
        }
    }
    
    return formatted.trim();
}

function beautifyYAML(code: string): string {
    // Simple YAML formatting
    const lines = code.split('\n');
    const result: string[] = [];
    
    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed === '') {
            result.push('');
            continue;
        }
        
        // Preserve indentation but ensure consistent spacing
        if (trimmed.startsWith('#') || trimmed.startsWith('- ') || trimmed.match(/^[\w.-]+:/)) {
            result.push(line.trimEnd());
        } else {
            result.push(line.trimEnd());
        }
    }
    
    return result.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function beautifyGraphQL(code: string): string {
    // Format GraphQL queries
    let indent = 0;
    const lines = code.replace(/[{}()]/g, match => ` ${match} `).split('\n');
    const result: string[] = [];
    
    for (let line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            result.push('');
            continue;
        }
        
        if (trimmed === '}') {
            indent = Math.max(0, indent - 1);
        }
        
        result.push('    '.repeat(indent) + trimmed);
        
        if (trimmed === '{') {
            indent++;
        }
    }
    
    return result.join('\n');
}

function beautifyPHP(code: string): string {
    return jsBeautify.js_beautify(code, {
        indent_size: 4,
        space_in_empty_paren: true,
        brace_style: 'collapse',
        jslint_happy: true
    });
}

function beautifyMarkdown(code: string): string {
    const lines = code.split('\n');
    const result: string[] = [];
    let inCodeBlock = false;
    let prevLine = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        // Handle code blocks
        if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
            inCodeBlock = !inCodeBlock;
            if (result.length > 0 && prevLine !== '') {
                result.push('');
            }
            result.push(line);
            result.push('');
            prevLine = '';
            continue;
        }
        
        // Preserve code block content unchanged
        if (inCodeBlock) {
            result.push(line);
            prevLine = line;
            continue;
        }
        
        // Handle headings
        if (trimmed.match(/^#{1,6}\s/)) {
            if (result.length > 0 && prevLine !== '') {
                result.push('');
            }
            result.push(trimmed.replace(/^(#{1,6})\s*/, '$1 '));
            prevLine = trimmed;
            continue;
        }
        
        // Handle horizontal rules
        if (trimmed.match(/^[-*_]{3,}$/)) {
            if (result.length > 0 && prevLine !== '') {
                result.push('');
            }
            result.push('---');
            prevLine = '---';
            continue;
        }
        
        // Handle list items
        if (trimmed.match(/^[-*+]\s/) || trimmed.match(/^\d+\.\s/)) {
            result.push(trimmed);
            prevLine = trimmed;
            continue;
        }
        
        // Handle tables
        if (trimmed.startsWith('|')) {
            result.push(line);
            prevLine = trimmed;
            continue;
        }
        
        // Handle empty lines
        if (trimmed === '') {
            result.push('');
            prevLine = '';
            continue;
        }
        
        // Regular text
        result.push(trimmed);
        prevLine = trimmed;
    }
    
    return result.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function beautifySQL(code: string): string {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN',
                     'INNER JOIN', 'OUTER JOIN', 'ON', 'GROUP BY', 'ORDER BY',
                     'HAVING', 'LIMIT', 'OFFSET', 'INSERT INTO', 'VALUES',
                     'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE',
                     'DROP TABLE', 'UNION', 'UNION ALL', 'AND', 'OR', 'NOT', 'IN',
                     'EXISTS', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL', 'AS'];
    
    let formatted = code;
    
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        formatted = formatted.replace(regex, `\n${keyword}`);
    });
    
    return formatted.replace(/\n{3,}/g, '\n\n').trim();
}

function beautifyDocker(code: string): string {
    // Format Dockerfile
    const lines = code.split('\n');
    const result: string[] = [];
    
    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed === '') {
            result.push('');
            continue;
        }
        
        if (trimmed.startsWith('#')) {
            result.push(trimmed);
            continue;
        }
        
        // Clean up instruction formatting
        const instruction = trimmed.split(/\s+/)[0].toUpperCase();
        const rest = trimmed.substring(instruction.length).trim();
        
        if (['FROM', 'RUN', 'CMD', 'LABEL', 'MAINTAINER', 'EXPOSE', 'ENV', 'ADD', 
             'COPY', 'ENTRYPOINT', 'VOLUME', 'USER', 'WORKDIR', 'ARG', 'ONBUILD',
             'STOPSIGNAL', 'HEALTHCHECK', 'SHELL'].includes(instruction)) {
            result.push(`${instruction} ${rest}`);
        } else {
            result.push(trimmed);
        }
    }
    
    return result.join('\n');
}

function beautifyENV(code: string): string {
    // Format .env files
    const lines = code.split('\n');
    const result: string[] = [];
    
    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed === '' || trimmed.startsWith('#')) {
            result.push(line);
            continue;
        }
        
        const parts = trimmed.split('=');
        if (parts.length >= 2) {
            result.push(`${parts[0].trim()}=${parts.slice(1).join('=').trim()}`);
        } else {
            result.push(trimmed);
        }
    }
    
    return result.join('\n');
}

function beautifyTOML(code: string): string {
    // Format TOML files
    const lines = code.split('\n');
    const result: string[] = [];
    
    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed === '') {
            result.push('');
            continue;
        }
        
        if (trimmed.startsWith('[')) {
            if (result.length > 0 && result[result.length - 1] !== '') {
                result.push('');
            }
            result.push(trimmed);
            continue;
        }
        
        result.push(trimmed);
    }
    
    return result.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

// ==================== MINIFY FUNCTIONS ====================

function minifyHTML(code: string): string {
    return code
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/>\s+</g, '><')
        .replace(/\s{2,}/g, ' ')
        .replace(/^\s+|\s+$/gm, '')
        .trim();
}

function minifyCSS(code: string): string {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .replace(/;\s*}/g, '}')
        .replace(/,\s*/g, ',')
        .trim();
}

function minifyJavaScript(code: string): string {
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}();,:\[\]])\s*/g, '$1')
        .replace(/;\s*}/g, '}')
        .trim();
}

function minifyJSX(code: string): string {
    // Minify JSX carefully - preserve JSX structure
    return code
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
        .replace(/>\s+</g, '><')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s*=\s*/g, '=')
        .trim();
}

function minifyTypeScript(code: string): string {
    return minifyJavaScript(code);
}

function minifyTSX(code: string): string {
    return minifyJSX(code);
}

function minifyJSON(code: string): string {
    try {
        return JSON.stringify(JSON.parse(code));
    } catch {
        return code.replace(/\s/g, '');
    }
}

function minifyXML(code: string): string {
    return minifyHTML(code);
}

function minifyYAML(code: string): string {
    return code
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:\[\],])\s*/g, '$1')
        .trim();
}

function minifyGraphQL(code: string): string {
    return code
        .replace(/#.*$/gm, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}():,])\s*/g, '$1')
        .trim();
}

function minifyPHP(code: string): string {
    return minifyJavaScript(code);
}

function minifyMarkdown(code: string): string {
    return code
        .replace(/\n{3,}/g, '\n\n')
        .replace(/[ \t]+$/gm, '')
        .trim() + '\n';
}

function minifySQL(code: string): string {
    return code.replace(/\s+/g, ' ').trim();
}

function minifyDocker(code: string): string {
    return code
        .replace(/#.*$/gm, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([=])\s*/g, '$1')
        .trim();
}

function minifyENV(code: string): string {
    return code
        .replace(/#.*$/gm, '')
        .replace(/\s*=\s*/g, '=')
        .trim();
}

function minifyTOML(code: string): string {
    return code
        .replace(/#.*$/gm, '')
        .replace(/\s+/g, ' ')
        .trim();
}

export function deactivate() {}