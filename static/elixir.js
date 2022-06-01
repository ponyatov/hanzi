
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

const key1 = {
  '丨': {ru: '|', pinyin: 'gǔn'},
  '丶': {ru: 'точка', pinyin: 'zhǔ'},
  '丿': {ru: 'откидная влево'},
  '亅': {ru: 'крюк', pinyin: 'jué'},
  '亠': {ru: 'точка/1', pinyin: 'tóu'},
  '人': {ru: 'человек', pinyin: 'rén'},
  '儿': {ru: 'Идущий человек', pinyin: 'r'},
  '小': {ru: 'Маленький'},
  '大': {ru: 'Большой'},
  '冖': {ru: 'Крышка', pinyin: 'mì'},
  '宀': {ru: 'Крыша'},
  '女': {ru: 'Женщина'},
  '子': {ru: 'Сын'},
  '口': {ru: 'Рот', pinyin: 'koǔ'},
  '马': {ru: 'Лошадь'},
  '彳': {ru: 'Шаг левой', pinyin: 'chì'},
  '艮': {ru: 'Крепкий'},
  '尸': {ru: 'Труп', pinyin: 'shī'},
  '匕': {ru: 'Черпак'},
  '力': {ru: 'Сила'},
  '刀': {ru: 'Нож', pinyin: 'dāo'},
  '刂': {ru: 'Нож'},
  '水': {ru: 'Вода'},
  '氵': {ru: 'Вода'},
  '冫': {ru: 'Лёд'},
  '火': {ru: 'Огонь', pinyin: 'huǒ'},
  '灬': {ru: 'Огонь'}
};

const key2 = {

};

const key3 = {

};

const key4 = {

};

const key5 = {

};

const key6 = {

};


const school = {
  // '​老':{ru:'старый', pinyin:'​lǎo'}, // hwd
  '师': {ru: 'учитель', pinyin: 'shī'},
  '上': {ru: 'начало', pinyin: 'shàng'},
  '下': {ru: 'конец', pinyin: 'xià'},
  '课': {ru: 'урок', pinyin: 'kè'},
  '坐': {ru: 'присаживайтесь'},
  '听': {ru: 'слушать', pinyin: 'tīng'},
  '看': {ru: 'смотреть'},
  '页': {ru: 'страница'},
  '说': {ru: 'говорить', pinyin: 'shuō'},
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
  '请': {ru: 'пожалуйста', pinyin: 'qǐng'},
  '问': {ru: 'спрашивать', pinyin: 'wèn'},
  '叫': {ru: 'вызывать'},
};

const p28L = {
  '你': {ru: 'ты', pinyin: 'nǐ'},
  '好': {ru: 'хорошо', pinyin: 'hǎo'},
  '请': {ru: 'пожалуйста', pinyin: 'qǐng'},
  '问': {ru: 'спрашивать', pinyin: 'wèn'},
  '叫': {ru: 'вызывать', pinyin: 'jiào'},
  '什': {ru: 'shen', pinyin: 'shén'},
  '么': {ru: 'me', pinyin: 'me'},
  '名': {ru: 'имя', pinyin: 'míng'},
  '字': {ru: 'произношение', pinyin: 'zì'},
  '我': {ru: 'я', pinyin: 'wǒ'},
  '呢': {ru: 'спец?', pinyin: 'ne'},
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

const voc = Object.assign(digits, key, key1, school, p28L, mestoim);

const allkeys = Object.keys(voc);

let keys = [];

function seven() {
  keys = []
  rus = []
  limit = allkeys.length * allkeys.length;
  while (keys.length < 7 && limit--) {
    char = allkeys[rand(allkeys.length)];
    ru = voc[char].ru;
    if (!keys.includes(char) && !rus.includes(ru)) {
      keys.push(char);
      rus.push(ru);
      voc[char].miss = 0x1;  // force repeat N times
    }
  }
}
seven();

function frame() {
  misses = 0;
  keys.forEach(char => {misses += voc[char].miss});
  if (!misses) seven();
}

function rnd(min, max) {
  // https://learn.javascript.ru/task/random-int-min-max
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function rand(max) {
  return rnd(0, max - 1);
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
  char = keys[rand(keys.length)];
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
  $('#stas').width(ww);
  $('#stat').width(window.innerWidth * .9 - ww);
  $('#stas').height(window.innerHeight * .85 - ww);
  hh = window.innerHeight * .95 - $('#navbar').height();
  $('#stat').height(hh);
  $('#stat').css({'height': hh});
  $('#stat').css({'min-height': hh});
  $('#stat').css({'max-height': hh});
}

window.speechSynthesis.cancel();  // reset

function quiz() {
  stat();
  hanzi.quiz({
    onComplete: (summaryData) => {
      ({character, totalMistakes} = summaryData);
      // console.log(summaryData);
      voc[character].miss = (voc[character].miss || 0) + totalMistakes;
      if (!totalMistakes & voc[character].miss > 0) voc[character].miss -= 1;
      // console.log(voc[character]);
      zhtts.say(char);
      setTimeout(nextQuiz, 2222);
      stat();
      frame();
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
        console.log(`'${char}': {ru: '${voc[char].ru}', pinyin: '${pin}'},`);
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
  voc[char].miss = voc[char].miss + 0x10 || 0x10;
  setTimeout(() => zhtts.say(char), 1);
  hanzi.animateCharacter({
    onComplete: quiz,
  });
}

function stat() {
  $('#stas').text('');
  $('#stat').text('');
  function info(char) {
    ret = `<tr>`;
    ret += `<td>${char}</td>`
    ret += `<td>${voc[char].ru || '?'}</td>`
    ret += `<td>${voc[char].pinyin || '?'}</td>`
    ret += `<td>${voc[char].miss || '?'}</td>`
    ret += `</tr>`;
    return ret;
  }
  keys.forEach(char => {
    $('#stas').append(info(char));
  });
  allkeys.forEach(char => {
    $('#stat').append(info(char));
  });
}

$(() => {
  //
  window.onresize = resize;
  $(window).trigger('resize');
  //
  $('#ru').on('click', () => {
    seven();
    nextQuiz();
  });
  $('#ru').trigger('click');
  $('#pinyin').on('click', showHanzi);
});
