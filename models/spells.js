var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spellSchema = new Schema({
  id:{type:String, required:true, unique:true},
  name: {type:String, required:true},
  desc: String,
  higher_level: String,
  page: String,
  range: Number,
  components: String,
  material: String,
  ritual: Boolean,
  duration: Number,
  concentration: Boolean,
  casting_time: Number,
  level: Number,
  school: { type:String, enum: [
    'Abjuration',
    'Conjuration',
    'Divination',
    'Enchantment',
    'Evocation',
    'Illusion',
    'Necromancy',
    'Transmutation']},
  class: [String],
  archetype: [String],
  domains: String,
  oaths: String,
  circles: String,
  patrons: String
},{collection:'Spells'});

module.exports = mongoose.model('Spell',spellSchema)
