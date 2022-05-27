
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

const key = {
  '王': {ru: 'король', pinyin: 'wáng'},
  '玉': {ru: 'яшма', pinyin: 'yù'},
  '好': {ru: 'хорошо', pinyin: 'hǎo'},
  '左': {ru: 'левый'},
  '右': {ru: 'правый', pinyin: 'yoù'},
};

const school = {
  // '​老':{ru:'старый', pinyin:'​lǎo'}, // hwd
  '师': {ru: 'учитель', pinyin: 'shī'},
  '上': {ru: 'начало', pinyin: 'shàng'},
  '下': {ru: 'конец', pinyin: 'xià'},
  '课': {ru: 'урок', pinyin: 'kè'},
  '请': {ru: 'пожалуйста', pinyin: 'qǐng'},
  '坐': {ru: 'присаживайтесь'},
  '听': {ru: 'слушать', pinyin: 'tīng'},
  '看': {ru: 'смотреть'},
  '页': {ru: 'страница'},
  '说': {ru: 'говорить', pinyin: 'shuō'},
  '问': {ru: 'спрашивать', pinyin: 'wèn'},
  '进': {ru: 'входить', pinyin: 'jìn'},
  '读': {ru: 'зачитывать', pinyin: 'dú'},
  '书': {ru: 'книга', pinyin: 'shū'},
  '告': {ru: 'сообщать', pinyin: 'gào'},
  '诉': {ru: 'обвинять'},
  '数': {ru: 'считать', pinyin: 'shù'},
  '字': {ru: 'буква', pinyin: 'zì'},
  '对': {ru: 'правильно'},
  '不': {ru: 'нет', pinyin: 'bù'},
  '再': {ru: 'снова'},
  '见': {ru: 'увидимся'},

};

const mestoim = {
  '你': {ru: 'ты', pinyin: 'nǐ'},
  '您': {ru: 'Вы', pinyin: 'nín'},
  '我': {ru: 'я', pinyin: 'wǒ'},
  '他': {ru: 'он', pinyin: 'tā'},
  '也': {ru: 'тоже', pinyin: 'yě'},
  '它': {ru: 'оно', pinyin: 'tā'},
  '们': {ru: 'множ', pinyin: 'men'},
  '什': {ru: 'что?'},
  '么': {ru: 'какой?', pinyin: 'me'},
};

const voc = Object.assign(digits, key, school, mestoim);

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
  //
  $('#stat').css({'top': $('#hanzi').position().top});
  $('#stat').height(ww);
  $('#stat').width(window.innerWidth * .9 - ww);
  $('#stat').height(window.innerHeight * .95 - $('#navbar').height());
}

window.speechSynthesis.cancel();  // reset

function quiz() {
  hanzi.quiz({
    onComplete: (summaryData) => {
      ({character, totalMistakes} = summaryData);
      // console.log(summaryData);
      voc[character].miss = (voc[character].miss || 0) + totalMistakes;
      if (!totalMistakes & voc[character].miss > 0) voc[character].miss -= 1;
      // console.log(voc[character]);
      zhtts.say(char);
      setTimeout(() => $('#ru').trigger('click'), 2222);
      //
      keys.forEach(char => {console.log(voc[char])});
      console.log('');
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

function statInit() {
  keys.forEach(char => {$('#stat').add(`<span id="${char}">${char}<span>`)});
}

$(() => {
  statInit();
  //
  window.onresize = resize;
  $(window).trigger('resize');
  //
  $('#ru').on('click', nextQuiz);
  $('#ru').trigger('click');
  $('#pinyin').on('click', showHanzi);
});
