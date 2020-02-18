new Vue({
   el:"#app",
   data:{
      player_heal:100,
      monster_heal:100,
      game_is_on:false,
      attack_multiple:10,
      meele_attack_multiple:25,
      monster_attack_multiple:15,
      heal_up_multiple:25,
      logs:[],
      log_text:{
         msg_attack:"gamer attacked!",
         msg_meele_attack:"gamer meele attacked!",
         msg_monster_attack:"monster attacked!",
         msg_heal_up:"gamer taked heal!",
         msg_give_up:"gamer gived up!"
      },
   },
   methods:{
        start_game:function(){
         this.game_is_on=true;
        },
        attack:function(){
         var point=Math.ceil(Math.random()*this.attack_multiple);
         this.monster_heal-=point;
         this.add_to_log({turn:"p", text: this.log_text.msg_attack + '( '+ point +' )'});
         this.monster_attack();
        
        },
        meele_attack:function(){
         var point=Math.ceil(Math.random()*this.meele_attack_multiple);
         this.monster_heal-=point;
         this.add_to_log({turn:"p", text:this.log_text.msg_meele_attack + '( '+ point +' )'});
         this.monster_attack();
        
        },
        heal_up:function(){
         var point=Math.ceil(Math.random()*this.heal_up_multiple);
         this.player_heal+=point;
         this.add_to_log({turn:"p", text:this.log_text.msg_heal_up + '( '+ point +' )'});
         this.monster_attack();
       
        },
        give_up:function(){
         this.player_heal=0;
         this.add_to_log({turn:"p", text:this.log_text.msg_give_up});
       
        },
        monster_attack:function(){
         var point=Math.ceil(Math.random()*this.monster_attack_multiple);
         this.add_to_log({turn:"m", text:this.log_text.msg_monster_attack + '( '+ point +' )'  });
         this.player_heal-=point;
        },
        add_to_log:function(log){
         this.logs.push(log);
        }

   },
   watch:{
      player_heal:function(value){
         if(value<=0){
            this.player_heal=0;
            if(confirm("You lost the game!.Try againg")){
               this.player_heal=100;
               this.monster_heal=100;
               this.logs=[];
            }
         }
         else if(value>=100){
            this.player_heal=100;
         }
      },
      monster_heal:function(value){
         if(value<=0){
            this.monster_heal=0;
            if(confirm("You won the game!.Try againg")){
               this.player_heal=100;
               this.monster_heal=100;
               this.logs=[];
            }
         }
        
      }
   },
   computed:{
      player_Progress:function(){
        return{
           width:this.player_heal+'%'
        };
      },
      monster_Progress:function(){
         return{
            width:this.monster_heal+'%'
         };
       }
   }
});