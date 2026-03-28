const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'Interveiw1.md');

function readFile() {
    return fs.readFileSync(FILE, 'utf8');
}

function writeFile(content) {
    fs.writeFileSync(FILE, content, 'utf8');
}

function normalize(s) {
    return s.replace(/[`"'\n]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

function parseQuestions(raw) {
    raw = raw.replace(/^```[\s\S]*?\n/, '').replace(/\n```\s*$/, '');
    const parts = raw.split(/\n(?=\s*\d+\.)/);
    const questions = [];
    for (const p of parts) {
        const m = p.match(/^\s*(\d+)\.\s*([\s\S]*)$/);
        if (m) {
            const num = parseInt(m[1], 10);
            const text = m[2].trim().replace(/\n+/g, ' ');
            questions.push({ num, text, norm: normalize(text) });
        }
    }
    return questions;
}

function classify(questions) {
    const categories = {
        html: [],
        css: [],
        js: [],
        react: [],
        logical: [],
    };

    const htmlKeys = ['html', 'semantic', 'meta', 'html5', 'id and class', 'id and class', 'preconnect', 'async/defer', 'async defer'];
    const cssKeys = ['css', 'specificity', 'flex', 'grid', 'rem', 'em', 'responsive', 'sass', 'scss', 'mixins', 'sprite', 'css task', 'box modal', 'box model'];
    const reactKeys = ['react', 'jsx', 'virtual dom', 'hooks', 'redux', 'hoc', 'nextjs', 'context api', 'dangerouslysetinnerhtml', 'pure component', 'useeffect', 'useref', 'usermemo', 'react memo', 'error boundaries', 'component'];
    const jsKeys = ['javascript', 'js', 'promise', 'async', 'await', 'event', 'hoist', 'closure', 'currying', 'prototype', 'this', 'call', 'apply', 'bind', 'array', 'object', 'typeof', 'null', 'undefined', 'coercion', 'iife', 'event loop', 'settimeout', 'debouncing', 'throttling', 'polyfill', 'map', 'filter', 'reduce', 'splice', 'slice', 'strict mode'];
    const logicalKeys = ['leetcode', 'task', 'write a logic', 'logic', 'output', 'coding', 'sort', 'count', 'algorithm', 'container with most water', 'search box', 'build an application', 'object manipulation', 'polyfill', 'exercise'];

    for (const q of questions) {
        const t = q.norm;
        let placed = false;

        // Check HTML
        if (htmlKeys.some(k => t.includes(k))) {
            categories.html.push(q);
            placed = true;
        }

        // Check CSS
        if (!placed && cssKeys.some(k => t.includes(k))) {
            categories.css.push(q);
            placed = true;
        }

        // Check React
        if (!placed && reactKeys.some(k => t.includes(k))) {
            categories.react.push(q);
            placed = true;
        }

        // Check JS
        if (!placed && jsKeys.some(k => t.includes(k))) {
            categories.js.push(q);
            placed = true;
        }

        // Logical / tasks
        if (!placed && logicalKeys.some(k => t.includes(k))) {
            categories.logical.push(q);
            placed = true;
        }

        // fallback -> logical
        if (!placed) {
            categories.logical.push(q);
        }
    }

    return categories;
}

function buildOutput(categories) {
    const lines = ['```markdown'];
    let i = 1;

    function appendSection(title, list) {
        if (list.length === 0) return;
        lines.push(`\n**${title}**`);
        for (const q of list) {
            lines.push(`${i}. ${q.text}`);
            i++;
        }
    }

    appendSection('HTML', categories.html);
    appendSection('CSS', categories.css);
    appendSection('JavaScript', categories.js);
    appendSection('ReactJS', categories.react);
    appendSection('Logical / Coding / Tasks', categories.logical);

    lines.push('```');
    return lines.join('\n') + '\n';
}

function main() {
    const raw = readFile();
    const questions = parseQuestions(raw);
    console.log('Parsed', questions.length, 'questions');
    const categories = classify(questions);
    const out = buildOutput(categories);
    writeFile(out);
    console.log('Rearranged and wrote', FILE);
}

main();
