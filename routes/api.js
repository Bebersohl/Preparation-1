var express = require('express');
var router = express.Router();

var Spell = require('../models/spells');


/*spells api*/
router.get('/spells',function(req,res,next) {
  Spell.find(function(err, spells){
    if (err){return res.send(err);}
    res.json(spells);
  });
});

router.get('/spells/:spell_id',function(req,res,next){
  Spell.findById(req.params.spell_id,function(err,card){
    if (err){return res.send(err);}
    res.json(card);
  })
})

module.exports = router;
