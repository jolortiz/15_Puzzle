
var app = function() {

    var self = {};
    self.is_configured = false;

    Vue.config.silent = false; // show all warnings

    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };

    // Enumerates an array.
    var enumerate = function(v) {
        var k=0;
        v.map(function(e) {e._idx = k++;});
    };

    // Initializes an attribute of an array of objects.
    var set_array_attribute = function (v, attr, x) {
        v.map(function (e) {e[attr] = x;});
    };

    self.initialize = function () {
        document.addEventListener('deviceready', self.ondeviceready, false);
    };

    self.ondeviceready = function () {
        // This callback is called once Cordova has finished
        // its own initialization.
        console.log("The device is ready");
        $("#vue-div").show(); // This is jQuery.
        self.is_configured = true;
    };

    self.reset = function () {
        self.vue.board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
        //self.vue.color
    };

    self.shuffle = function(i, j, board) {
        // You need to implement this.
        var pos = (4*i+j); //position on board
        var blackpos;
        for(var k=0; k<=15; k++){ //searches for black tile
            if(board[k] == 0){ blackpos = k; }
        }
        console.log("Shuffle:" + i + ", " + j);
        console.log("position:"+ pos);
        console.log("blacktileposition:"+ blackpos);

        if(pos == (blackpos - 1) || pos == (blackpos + 1)
        || pos == (blackpos - 4) || pos == (blackpos + 4)){ //checks to make sure switch is possible
            console.log("OK");
            var temp = board[pos];
            var temp2 = board[blackpos];
            Vue.set(board, pos, temp2);
            Vue.set(board, blackpos, temp);

        }else{
            console.log("NOT OK");
        }
    };

    self.scramble = function() {
        var flag = 0;
        while(flag == 0){ //repeat if unsolvable
        for (var i = self.vue.board.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = self.vue.board[i];
            var temp2 = self.vue.board[j];
            Vue.set(self.vue.board, i, temp2);
            Vue.set(self.vue.board, j, temp);
        }
        for(var k=0; k<self.vue.board.length; k++){
            console.log("item:" + k + ": " + self.vue.board[k]);
        }
        var inversions = 0;
        var blackpos = 0;
        for(var l=0; l<self.vue.board.length; l++){
            for(var m=l+1; m<self.vue.board.length; m++){
                if(self.vue.board[l] > self.vue.board[m]){
                    if(self.vue.board[m] != 0){
                        inversions++;
                    }else{
                        blackpos = m;
                    }
                }
            }
            console.log("inversions:" + l + ": " + inversions);
        }
        console.log("finalcount_inversions: " + inversions);
        console.log("blackpos: " + blackpos);
        if((blackpos >= 0 && blackpos <= 3) || (blackpos >= 8 && blackpos <= 11)){
            if(inversions % 2 == 1){
                flag = 1;
            }
        }else{
            if(inversions % 2 == 0){
                flag = 1;
            }
        }
        }
    };

    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            board: []
            //color: []
        },
        methods: {
            reset: self.reset,
            shuffle: self.shuffle,
            scramble: self.scramble
        }

    });

    self.reset();

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){
    APP = app();
    APP.initialize();
});
