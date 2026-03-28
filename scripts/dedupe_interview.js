const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'Interveiw1.md');

function readFile() {
    return fs.readFileSync(FILE, 'utf8');
}

function writeFile(content) {
    fs.writeFileSync(FILE, content, 'utf8');
}

function normalizeText(s) {
    return s
        .replace(/\s+/g, ' ')
        .replace(/[\"'`]/g, '')
        .trim()
        .toLowerCase();
}

function tokens(s) {
    return normalizeText(s)
        .split(/[^a-z0-9]+/)
        .filter(Boolean);
}

function diceCoefficient(aTokens, bTokens) {
    const A = new Set(aTokens);
    const B = new Set(bTokens);
    let intersection = 0;
    for (const t of A) if (B.has(t)) intersection++;
    if (A.size + B.size === 0) return 1;
    return (2 * intersection) / (A.size + B.size);
}

function parseQuestions(raw) {
    // remove markdown fences if present
    raw = raw.replace(/^```[\s\S]*?\n/, '').replace(/\n```\s*$/, '');

    // Split on lines that start with number + dot
    const parts = raw.split(/\n(?=\s*\d+\.)/);
    const questions = [];
    for (const p of parts) {
        const m = p.match(/^\s*(\d+)\.\s*([\s\S]*)$/);
        if (m) {
            const num = parseInt(m[1], 10);
            const text = m[2].trim().replace(/\n+/g, ' ');
            questions.push({ num, text });
        }
    }
    return questions;
}

function dedupe(questions, threshold = 0.6) {
    const keep = new Array(questions.length).fill(true);
    for (let i = 0; i < questions.length; i++) {
        if (!keep[i]) continue;
        for (let j = i + 1; j < questions.length; j++) {
            if (!keep[j]) continue;
            const a = questions[i].text;
            const b = questions[j].text;
            const aTokens = tokens(a);
            const bTokens = tokens(b);
            const score = diceCoefficient(aTokens, bTokens);
            if (score >= threshold) {
                // remove the shorter one (by token count); if equal, remove j
                if (aTokens.length >= bTokens.length) {
                    keep[j] = false;
                } else {
                    keep[i] = false;
                }
            }
        }
    }
    return questions.filter((_, idx) => keep[idx]);
}

function buildOutput(questions) {
    const lines = ['```markdown'];
    let i = 1;
    for (const q of questions) {
        lines.push(`${i}. ${q.text}`);
        i++;
    }
    lines.push('```');
    return lines.join('\n') + '\n';
}

function main() {
    const raw = readFile();
    const questions = parseQuestions(raw);
    console.log('Found', questions.length, 'questions');
    const kept = dedupe(questions, 0.6);
    console.log('After dedupe, keeping', kept.length, 'questions');
    const out = buildOutput(kept);
    writeFile(out);
    console.log('File updated:', FILE);
}

main();
