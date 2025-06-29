const fs = require('fs/promises');
const axios = require('axios');

async function submitProof() {
    try {
        const proof = JSON.parse(await fs.readFile('proof.json', 'utf8'));
        const publicInputs = JSON.parse(await fs.readFile('public.json', 'utf8'));
        const verificationKey = JSON.parse(await fs.readFile('verification_key.json', 'utf8'));
        const apiKey = process.env.ZKVERIFY_API_KEY;

        if (!apiKey) {
            throw new Error('ZKVERIFY_API_KEY is not set in GitHub Secrets!');
        }

        const payload = {
            proof_system: "groth16",
            proof: { ...proof, curve: "bn128", protocol: "groth16" },
            public_inputs: publicInputs,
            verification_key: verificationKey
        };

        console.log("Submitting proof to zkVerify Relayer...");
        const response = await axios.post('https://relayer.testnet.zkverify.io/api/v1/proofs', payload, {
            headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' }
        });

        console.log("Successfully submitted proof! Job ID:", response.data.jobId);
    } catch (error) {
        console.error("Error submitting proof:", error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

submitProof();