pragma circom 2.0.0;

template MyCircuit() {
    // Inputs
    signal input a;
    signal input b;
    
    // Output
    signal output c;
    
    // Logic: c === a*a + b
    c <== a*a + b;
}

component main = MyCircuit();s