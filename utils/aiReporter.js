import dotenv from 'dotenv';
dotenv.config();

class AIReporter {
    constructor() {
        this.failures = []; 
    }

    onTestEnd(test, result) {
        if (result.status === 'failed') {
            this.failures.push({
                name: test.title,
                error: result.error?.message || 'No error message available',
                duration: result.duration,
            });
        }
    }

    async onEnd() {
        if (this.failures.length === 0) {
            console.log('\n✅ AI Reporter: All tests passed — no failures to summarize.\n');
            return;
        }

        const failureSummary = this.failures.map((f, index) => 
            `${index + 1}. Test: "${f.name}"\n Error: ${f.error}\n Duration: ${f.duration}ms`).join('\n\n');
        console.log('\n AI Reporter: Failures detected — sending to Gemini for analysis...\n');

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'x-goog-api-key': process.env.GEMINI_API_KEY,
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
    contents: [
        {
            parts: [
                {
                    text: `You are a QA engineer reviewing automated test failures.

The following Playwright tests failed:

${failureSummary}

Write a short, clear summary for a non-technical client or product manager.
Explain what likely broke in plain English, and suggest what should be investigated.
Keep it under 150 words. Be direct and professional.`
                }
            ]
        }
    ]
}),
}
);

            if (!response.ok) {
                console.error(`❌ AI Reporter: API call failed with status ${response.status}`);
                return;
            }

            const data = await response.json();
            const aiSummary = data.candidates[0].content.parts[0].text;

            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(' AI FAILURE SUMMARY');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(aiSummary);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

            const fs = await import('fs');
            fs.writeFileSync('ai-report.txt', aiSummary);
            console.log(' AI report saved to ai-report.txt\n');
            }
        catch (error) {
            console.error('❌ AI Reporter error:', error.message);
        }

    }
}

export default AIReporter;