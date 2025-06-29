const fs = require('fs/promises');
const axios = require('axios');

async function submitProof() {
    try {
        // প্রয়োজনীয় ফাইলগুলো পড়ুন
        const proof = JSON.parse(await fs.readFile('proof.json', 'utf8'));
        const publicInputs = JSON.parse(await fs.readFile('public.json', 'utf8'));
        const verificationKey = JSON.parse(await fs.readFile('verification_key.json', 'utf8'));

        // API থেকে পাওয়া কী
        const apiKey = process.env.ZKVERIFY_API_KEY;
        if (!apiKey) {
            throw new Error('ZKVERIFY_API_KEY is not set!');
        }

        // Relayer API-এর জন্য ডেটা প্রস্তুত করুন
        const payload = {
            proof_system: "groth16",
            proof: { ...proof, curve: "bn128", protocol: "groth16" },
            public_inputs: publicInputs,
            verification_key: verificationKey
        };

        console.log("Submitting proof to zkVerify Relayer...");

        const response = await axios.post('https://relayer.testnet.zkverify.io/api/v1/proofs', payload, {
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        console.log("Successfully submitted proof!");
        console.log("Job ID:", response.data.jobId);

    } catch (error) {
        console.error("Error submitting proof:", error.response ? error.response.data : error.message);
        process.exit(1); // Exit with error
    }
}

submitProof();