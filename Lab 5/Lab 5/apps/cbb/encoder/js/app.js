var app = new Vue({
    el: '#baseband-encoder',
    data: {
        bits: [],
        encodedBits: [],
        encodedBits_NRZL: [],
        encodedBits_NRZ: [],
        encodedBits_NRZS: [],
        encodedBits_RZ: [],
        status: '',
        numberOfBits: 16,
        validateBit: validateBit
    },
    created: function () {
        this.bits = getBitstream(this.numberOfBits);
    },
    methods: {
        encode: function(){
            this.encodedBits = getManchesterLevelEncoding(this.bits);
            this.encodedBits_NRZ = getNRZL(this.bits);
        }
    }
})

console.log('🍓🥑🍏☕🏆⚽✅🚦');