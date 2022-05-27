
const digits = {
  '零': {ru: '0', pinyin: 'líng'},
  '一': {ru: '1', pinyin: 'yī'},
  '二': {ru: '2', pinyin: 'èr'},
  '三': {ru: '3', pinyin: 'sān'},
  '四': {ru: '4', pinyin: 'sì'},
  '五': {ru: '5', pinyin: 'wǔ'},
  '六': {ru: '6', pinyin: 'liù'},
  '七': {ru: '7', pinyin: 'qī'},
  '八': {ru: '8', pinyin: 'bā'},
  '九': {ru: '9', pinyin: 'jiǔ'},
  '十': {ru: '10', pinyin: 'shí'}
};

const voc = digits;

const keys = Object.keys(voc);

function rnd(min, max) {
  // https://learn.javascript.ru/task/random-int-min-max
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

last = undefined;
char = undefined;
function randvoc() {
  sel = [];
  maxmiss = 0;
  keys.forEach(char => {
    sel += [char];
    miss = voc[char].miss || 0;
    maxmiss = Math.max(miss, maxmiss)
    for (i = 0; i < voc[char].miss || 0; i++) sel += [char];
  });
  keys.forEach(char => {
    if (voc[char].miss == undefined)
      for (j = 0; j < maxmiss + 1; j++) sel += [char];
  });
  console.log(sel);
  //
  char = keys[rnd(0, keys.length - 1)];
  if (char == last)
    return randvoc();
  else {
    last = char;
    return char;
  };
}

zhtts = new SpeechSynthesisUtterance();
zhtts.lang = 'zh';
zhtts.say = function(text) {
  zhtts.text = text;
  window.speechSynthesis.speak(zhtts);
};

rutts = new SpeechSynthesisUtterance();
rutts.lang = 'ru';
rutts.say = function(text) {
  rutts.text = text;
  window.speechSynthesis.speak(rutts);
};

function say(char, ru) {
  rutts.say(ru);
  zhtts.say(char);
}

function w() {
  return Math.min(window.innerWidth, window.innerHeight / 2)
}

function resize() {
  ww = w();
  vv = window.innerWidth - ww * 1.1;
  console.log('resize', ww);
  $('#hanzi').width(ww);
  $('#hanzi').height(ww);
  $('#ctl').css({'width': ww + 'px'});
}

window.speechSynthesis.cancel();  // reset

function quiz() {
  hanzi.quiz({
    onComplete: (summaryData) => {
      ({character, totalMistakes} = summaryData);
      // console.log(summaryData);
      voc[character].miss = (voc[character].miss || 0) + totalMistakes;
      // console.log(voc[character]);
      setTimeout(() => $('#ru').trigger('click'), 1111);
    },
  });
}

function nextQuiz() {
  $('#hanzi').empty();
  //
  var char = randvoc();
  var ru = voc[char].ru;
  $('#ru').text(ru);
  //
  var pin = voc[char].pinyin;
  if (!pin)
    $.ajax({
      url: `/pinyin/${char}`,
      success: (pin) => {
        console.log(`'${char}':{ru:'${voc[char].ru}', pinyin:'${pin}'},`);
        voc[char].pinyin = pin;
        $('#pinyin').text(pin);
      }
    });
  $('#pinyin').text(pin);

  // hanzi
  setTimeout(() => zhtts.say(char), 1);
  hanzi = HanziWriter.create('hanzi', char, {
    strokeColor: '#654',
    radicalColor: '#448',
    showCharacter: false,
    showOutline: false,
    strokeAnimationSpeed: 1.1,
    delayBetweenStrokes: 11,
  });
  // animate & quiz
  quiz();
}

function showHanzi() {
  setTimeout(() => zhtts.say(char), 1);
  hanzi.animateCharacter({
    onComplete: quiz,
  });
}

$(() => {
  //
  window.onresize = resize;
  $(window).trigger('resize');
  //
  $('#ru').on('click', nextQuiz);
  $('#ru').trigger('click');
  $('#pinyin').on('click', showHanzi);
});
