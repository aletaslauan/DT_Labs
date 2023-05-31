var app = new Vue({
    el: '#hamming-encoder',
    data: {
        dataBits: [],
        status: '',
        parity_bit: 0,
        numberOfDataBits: 4
    },
    created: function () {
        this.initDataBits(4);
    },
    methods: {
        parity_check: function() {
            // this.parity = parseInt(this.parity);
            // console.log(this.parity_bit);
        },

        initDataBits: function(){
            this.dataBits=[];
            
            for(var i=0;i<this.numberOfDataBits;i++){
                var bit = { data: null };
                this.dataBits.push(bit);
            }
        },
        send: function () {
            if (this.validate(this.dataBits) === true){
                if (this.numberOfDataBits == 4 && this.parity_bit == 0)
                    var encodedMessage = this.encode(this.dataBits);
                else if (this.numberOfDataBits == 4)
                    var encodedMessage = this.encode_parity4(this.dataBits);
                else if (this.numberOfDataBits == 8 && this.parity_bit == 0)
                    var encodedMessage = this.encode8(this.dataBits);
                else
                    var encodedMessage = this.encode_parity8(this.dataBits);
                // this.status = encodedMessage + ' encoded sent to server';

                return axios.put("http://localhost:3000/message",
                    {bits: encodedMessage, no: this.numberOfDataBits,
                        p: this.parity_bit}).then(
                    response => (this.status = response.data)
                );
            } else {
                this.status = 'Input is not valid. Please use 0 or 1 as data bit values';
            }
        },
        encode: function(bits){
            // This function must be changed to allow any number of data bits
            // Right now it only works for 4 data bits
            var c4=this.parity(parseInt(bits[1].data)+parseInt(bits[2].data)+
                parseInt(bits[3].data));
            var c2=this.parity(parseInt(bits[0].data)+parseInt(bits[2].data)+parseInt(bits[3].data));
            var c1=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+parseInt(bits[3].data));

            console.log([c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data)]);
            return [c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data)];
        },
        parity: function(number){
            return number % 2;
        },
        validate: function(bits){
            for(var i=0; i<bits.length;i++){
                if (this.validateBit(bits[i].data) === false)
                return false;
            }
            return true;
        },
        validateBit: function(character){
            if (character === null) return false;
            return (parseInt(character) === 0 ||
            parseInt(character) === 1);  
        },


        encode_parity4: function(bits) {
            var c4=this.parity(parseInt(bits[1].data)+parseInt(bits[2].data)+parseInt(bits[3].data));
            var c2=this.parity(parseInt(bits[0].data)+parseInt(bits[2].data)+parseInt(bits[3].data));
            var c1=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+parseInt(bits[3].data));
            var c0=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+
                parseInt(bits[2].data)+parseInt(bits[3].data)+parseInt(c1)+
                parseInt(c2)+parseInt(c4));
            // console.log("we have some parity");
            console.log([c0,c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data)]);
            return [c0,c1,c2,parseInt(bits[0].data),c4,parseInt(bits[1].data),parseInt(bits[2].data),parseInt(bits[3].data)];
        },

        encode8: function(bits) {
            var c8=this.parity(parseInt(bits[4].data)+parseInt(bits[5].data)+
                parseInt(bits[6].data)+parseInt(bits[7].data));
            var c4=this.parity(parseInt(bits[1].data)+parseInt(bits[2].data)+
                parseInt(bits[3].data)+parseInt(bits[7].data));
            var c2=this.parity(parseInt(bits[0].data)+parseInt(bits[2].data)+
                parseInt(bits[3].data)+parseInt(bits[5].data)+
                parseInt(bits[6].data));
            var c1=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+
                parseInt(bits[3].data)+parseInt(bits[4].data)+
                parseInt(bits[6].data));
            
            console.log([c1,c2,parseInt(bits[0].data),c4, parseInt(bits[1].data),
                parseInt(bits[2].data),parseInt(bits[3].data),c8,
                parseInt(bits[4].data),parseInt(bits[5].data),
                parseInt(bits[6].data),parseInt(bits[7].data)]);

            return [c1,c2,parseInt(bits[0].data),c4, parseInt(bits[1].data),
                parseInt(bits[2].data),parseInt(bits[3].data),c8,
                parseInt(bits[4].data),parseInt(bits[5].data),
                parseInt(bits[6].data),parseInt(bits[7].data)];
        },

        encode_parity8: function(bits) {
            var c8=this.parity(parseInt(bits[4].data)+parseInt(bits[5].data)+
                parseInt(bits[6].data)+parseInt(bits[7].data));
            var c4=this.parity(parseInt(bits[1].data)+parseInt(bits[2].data)+
                parseInt(bits[3].data)+parseInt(bits[7].data));
            var c2=this.parity(parseInt(bits[0].data)+parseInt(bits[2].data)+
                parseInt(bits[3].data)+parseInt(bits[5].data)+
                parseInt(bits[6].data));
            var c1=this.parity(parseInt(bits[0].data)+parseInt(bits[1].data)+
                parseInt(bits[3].data)+parseInt(bits[4].data)+
                parseInt(bits[6].data));
            var c0=this.parity(c1+c2+c4+c8+parseInt(bits[0].data)+
                parseInt(bits[1].data)+parseInt(bits[2].data)+
                parseInt(bits[3].data)+parseInt(bits[4].data)+
                parseInt(bits[5].data)+parseInt(bits[6].data)+
                parseInt(bits[7].data));

            console.log([c0,c1,c2,parseInt(bits[0].data),c4, parseInt(bits[1].data),
                parseInt(bits[2].data),parseInt(bits[3].data),c8,
                parseInt(bits[4].data),parseInt(bits[5].data),
                parseInt(bits[6].data),parseInt(bits[7].data)]);

            return [c0,c1,c2,parseInt(bits[0].data),c4, parseInt(bits[1].data),
                parseInt(bits[2].data),parseInt(bits[3].data),c8,
                parseInt(bits[4].data),parseInt(bits[5].data),
                parseInt(bits[6].data),parseInt(bits[7].data)];
        },
    }
})
