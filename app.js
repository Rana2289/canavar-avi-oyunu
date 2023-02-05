new Vue({
    el: "#app",
    data :{
        player_heal : 100,
        monster_heal:100,
        game_is_on :false,
        logs : [],
    },
    methods:{
        start_game :function (){
            this.game_is_on=true;
            this.player_heal=100;
            this.monster_heal=100;
        },
        attack :function (){
            var sayi =Math.ceil(Math.random()*10);
            this.monster_heal-=sayi;
            this.monster_attack();
            this.add_to_log({turn  : "p" ,text :"oyuncu atağı (" + sayi +") " })

        },
        special_attack:function (){
            var sayi =Math.ceil(Math.random()*25);
            this.monster_heal-=sayi;
            this.monster_attack();
            this.add_to_log({turn  : "p" ,text :" özel oyuncu atağı (" + sayi +") "})

        },
        heal_up:function (){
            var sayi =Math.ceil(Math.random()*25);
            this.player_heal+=sayi;
            this.monster_attack();
            this.add_to_log({turn  : "p" ,text :" ilk yardım (" + sayi +") "})
        },
        give_up : function (){
            this.player_heal=0;
            this.add_to_log({turn  : "p" ,text :" oyuncu pes etti!!! "})
        },

        monster_attack: function (){
            var sayi =Math.ceil(Math.random()*15);
            this.player_heal-=sayi;
            this.add_to_log({turn  : "m" ,text :" canavar atağı  (" + sayi +") "})
        },
        add_to_log :function (log){
            this.logs.push(log);
        },
    },
    watch :{
        player_heal : function (value) {
            if(value<=0){
                this.player_heal=0
                if(confirm("KAYBETTINIZ TEKRAR OYNAMAK ISTERMISINIZZ?")){
                    this.player_heal= 100;
                    this.monster_heal=100;
                }
            }
            else if(value>=100){
                this.player_heal=100
            }
        },
        monster_heal : function ( value ){
            if(value<=0){
                this.monster_heal=0
                if(confirm("KAZANDINIZ TEKRAR OYNAMAK ISTERMISINIZZ?")){
                    this.player_heal= 100;
                    this.monster_heal=100;
                }
            }

        }
    }
})