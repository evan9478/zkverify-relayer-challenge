pragma circom 2.0.0;

template MyCircuit() {
    // Inputs (এই লাইনগুলো আপনার কোডে ছিল না)
    signal input a;
    signal input b;
    
    // Output (এই লাইনটিও আপনার কোডে ছিল না)
    signal output c;
    
    // Logic: c === a*a + b
    c <== a*a + b;
}

component main = MyCircuit();