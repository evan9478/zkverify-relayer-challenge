pragma circom 2.0.0;
template MyCircuit() {
    signal input a;
    signal input b;
    signal output c;
    
    c <== a*a + b;
}
component main = MyCircuit();
