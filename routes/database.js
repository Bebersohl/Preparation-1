<<<<<<< HEAD
var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Spell = require('../models/spells');

router.get('/', function(req,res,next){

  //change query to match schema
  var conditions = _.omit(req.query,['minLevelControl','maxLevelControl','minCastControl','maxCastControl','minDurationControl','maxDurationControl','minRangeControl','maxRangeControl','verbalControl','somaticControl','materialControl','expensiveMaterialControl']);
  var ranges = _.pick(req.query,['minLevelControl','maxLevelControl','minCastControl','maxCastControl','minDurationControl','maxDurationControl','minRangeControl','maxRangeControl']);
  var components = _.pick(req.query,['verbalControl','somaticControl','materialControl','expensiveMaterialControl']);

  //remove any blank queries
  conditions = _.pick(conditions,_.identity);
  ranges = _.pick(ranges,_.identity);

  //components -- make the string
  var componentArray = [];
  if (components.verbalControl) {componentArray.push("V");}
  if (components.somaticControl) {componentArray.push("S");}
  if (components.materialControl) {componentArray.push("M");}
  var componentString = componentArray.join(', ');

  //components -- add the string
  if (componentString !== '') {conditions.components = componentString;}

  //components == expensive
  if (components.expensiveMaterialControl) {conditions.material = {"$regex":/gp/};}

  //level -- if there's a query, add it to conditions
  if (ranges.minLevelControl && ranges.maxLevelControl){
    if (ranges.minLevelControl <= ranges.maxLevelControl){
      conditions.level = {"$gte":ranges.minLevelControl,"$lte":ranges.maxLevelControl};
    } else {
      conditions.level = {"$gte":ranges.maxLevelControl,"$lte":ranges.minLevelControl};
    }
  }

  //casting_time -- if there's a query, add it to conditions
  if (ranges.minCastControl && ranges.maxCastControl){
    if (ranges.minCastControl <= ranges.maxCastControl) {
      conditions.casting_time = {"$gte":ranges.minCastControl,"$lte":ranges.maxCastControl};
    } else {
      conditions.casting_time = {"$gte":ranges.maxCastControl,"$lte":ranges.minCastControl};
    }
  }

  //duration -- if there's a query, add it to conditions
  if (ranges.minDurationControl && ranges.maxDurationControl){
    if (ranges.minDurationControl <= ranges.maxDurationControl) {
      conditions.duration = {"$gte":ranges.minDurationControl,"$lte":ranges.maxDurationControl};
    } else {
      conditions.duration = {"$gte":ranges.maxDurationControl,"$lte":ranges.minDurationControl};
    }
  }

  //range -- if there's a query, add it to conditions
  if  (ranges.minRangeControl && ranges.maxRangeControl) {
    if (ranges.minRangeControl <= ranges.maxRangeControl){
      conditions.range = {"$gte":ranges.minRangeControl,"$lte":ranges.maxRangeControl};
    } else {
      conditions.range = {"$gte":ranges.maxRangeControl,"$lte":ranges.minRangeControl};
    }
  }

  //source
  if (conditions.page === "phb") {conditions.page = {"$regex":/phb/i};}
  if (conditions.page === "ee pc") {conditions.page = {"$regex":/ee/i};}
  if (conditions.page === "scag") {conditions.page = {"$regex":/scag/i};}

  //search
  if (conditions.name) {
    var reg = new RegExp(conditions.name, 'i');
    conditions.name = {"$regex":reg};
  }


  console.log("===QUERY===\n" + JSON.stringify(conditions));

  Spell.find(conditions, function(err,spells){
    if (err){return res.send(err);}
    console.log(spells.length);
    res.render('database',{spells: spells});
  }).sort({'level':'ascending','name':'ascending'});
});

module.exports = router;
=======
var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Spell = require('../models/spells');

router.get('/', function(req,res,next){

  //change query to match schema
  var conditions = _.omit(req.query,['minLevelControl','maxLevelControl','minCastControl','maxCastControl','minDurationControl','maxDurationControl','minRangeControl','maxRangeControl','verbalControl','somaticControl','materialControl','expensiveMaterialControl']);
  var ranges = _.pick(req.query,['minLevelControl','maxLevelControl','minCastControl','maxCastControl','minDurationControl','maxDurationControl','minRangeControl','maxRangeControl']);
  var components = _.pick(req.query,['verbalControl','somaticControl','materialControl','expensiveMaterialControl']);

  //remove any blank queries
  conditions = _.pick(conditions,_.identity);
  ranges = _.pick(ranges,_.identity);

  //components -- make the string
  var componentArray = [];
  if (components.verbalControl) {componentArray.push("V");}
  if (components.somaticControl) {componentArray.push("S");}
  if (components.materialControl) {componentArray.push("M");}
  var componentString = componentArray.join(', ');

  //components -- add the string
  if (componentString !== '') {conditions.components = componentString;}

  //components == expensive
  if (components.expensiveMaterialControl) {conditions.material = {"$regex":/gp/};}

  //level -- if there's a query, add it to conditions
  if (ranges.minLevelControl && ranges.maxLevelControl){
    if (ranges.minLevelControl <= ranges.maxLevelControl){
      conditions.level = {"$gte":ranges.minLevelControl,"$lte":ranges.maxLevelControl};
    } else {
      conditions.level = {"$gte":ranges.maxLevelControl,"$lte":ranges.minLevelControl};
    }
  }

  //casting_time -- if there's a query, add it to conditions
  if (ranges.minCastControl && ranges.maxCastControl){
    if (ranges.minCastControl <= ranges.maxCastControl) {
      conditions.casting_time = {"$gte":ranges.minCastControl,"$lte":ranges.maxCastControl};
    } else {
      conditions.casting_time = {"$gte":ranges.maxCastControl,"$lte":ranges.minCastControl};
    }
  }

  //duration -- if there's a query, add it to conditions
  if (ranges.minDurationControl && ranges.maxDurationControl){
    if (ranges.minDurationControl <= ranges.maxDurationControl) {
      conditions.duration = {"$gte":ranges.minDurationControl,"$lte":ranges.maxDurationControl};
    } else {
      conditions.duration = {"$gte":ranges.maxDurationControl,"$lte":ranges.minDurationControl};
    }
  }

  //range -- if there's a query, add it to conditions
  if  (ranges.minRangeControl && ranges.maxRangeControl) {
    if (ranges.minRangeControl <= ranges.maxRangeControl){
      conditions.range = {"$gte":ranges.minRangeControl,"$lte":ranges.maxRangeControl};
    } else {
      conditions.range = {"$gte":ranges.maxRangeControl,"$lte":ranges.minRangeControl};
    }
  }

  //source
  if (conditions.page === "phb") {conditions.page = {"$regex":/phb/i};}
  if (conditions.page === "ee pc") {conditions.page = {"$regex":/ee/i};}
  if (conditions.page === "scag") {conditions.page = {"$regex":/scag/i};}

  //search
  if (conditions.name) {
    var reg = new RegExp(conditions.name, 'i');
    conditions.name = {"$regex":reg};
  }


  console.log("===QUERY===\n" + JSON.stringify(conditions));

  Spell.find(conditions, function(err,spells){
    if (err){return res.send(err);}
    console.log(spells.length);
    res.render('database',{spells: spells});
  }).sort({'level':'ascending','name':'ascending'});
});

module.exports = router;
>>>>>>> cac6cef050b1a472a9382bdd6396773bc3af74e8
