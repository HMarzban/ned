
app.component.controller(function(){
   /// console.log(this)

    let like = 0;
    let dislike = 0;
    this.pubsub.on('rateApp',function(_data){
      
        like += _data.like || 0;
        dislike += _data.dislike || 0;

        $('app-head .rateApp').html(`<span class="like"> Like: ${like} </span> <span class="dislike"> Dislike: ${dislike}  </span>`);
    })
   


});