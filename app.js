new Vue({
    el: "#app",
    data: {
        player_heal: 100,
        monster_heal: 100,
        game_is_on: false,
        logs: [],
        hak: 100,
    },
    methods: {
        start_game: function () {
            this.game_is_on = true;
            this.player_heal = 100;
            this.monster_heal = 100;
        },
        attack: function () {
            var sayi = Math.ceil(Math.random() * 10);
            this.monster_heal -= sayi;
            this.monster_attack();
            this.add_to_log({turn: "p", text: "oyuncu atağı (" + sayi + ") "})
            this.hak += 5;
        },
        special_attack: function () {
            if (this.hak >= 15) {
                var sayi = Math.ceil(Math.random() * 25);
                this.monster_heal -= sayi;
                this.monster_attack();
                this.add_to_log({turn: "p", text: " özel oyuncu atağı (" + sayi + ") "})
                this.hak -= 15;
            }
        },
        heal_up: function () {
            if (this.hak >= 10) {
                var sayi = Math.ceil(Math.random() * 25);
                this.player_heal += sayi;
                this.monster_attack();
                this.add_to_log({turn: "p", text: " ilk yardım (" + sayi + ") "})
                this.hak -= 10;
            }
        },
        give_up: function () {
            this.player_heal = 0;
            this.add_to_log({turn: "p", text: " oyuncu pes etti!!! "})
        },

        monster_attack: function () {
            var sayi = Math.ceil(Math.random() * 15);
            this.player_heal -= sayi;
            this.add_to_log({turn: "m", text: " canavar atağı  (" + sayi + ") "})
        },
        add_to_log: function (log) {
            this.logs.push(log);
        },
    },
    watch: {
        player_heal: function (value) {
            if (value <= 0) {
                this.player_heal = 0
                if (confirm("KAYBETTINIZ TEKRAR OYNAMAK ISTERMISINIZZ?")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.hak= 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.player_heal = 100
            }
        },
        monster_heal: function (value) {
            if (value <= 0) {
                this.monster_heal = 0
                if (confirm("KAZANDINIZ TEKRAR OYNAMAK ISTERMISINIZZ?")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.hak= 100;
                    this.logs = [];
                }
            }

        },
        hak: function (x) {
            if(x>=100){
                this.hak=100;
            }

        },
    }
})