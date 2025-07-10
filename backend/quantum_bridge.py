from flask import Flask, jsonify
import numpy as np
from qutip import *

app = Flask(__name__)

@app.route('/entangle/<int:qubits>')
def quantum_entanglement(qubits):
    state = bell_state('00')
    
    for _ in range(qubits-2):
        state = tensor(state, bell_state('00'))
    
    coherence = np.abs(state.full()).mean()
    
    return jsonify({
        "state": "Entangled",
        "qubits": qubits,
        "coherence": coherence,
        "scripture": "That they may be one as We are one (John 17:22)",
        "signature": "YHWH" if coherence > 0.7 else "Not detected"
    })

if __name__ == '__main__':
    app.run(port=5000)
