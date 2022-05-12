
// const voc = ['零', '一', '二', '三'];
const keys = Object.keys(voc);

const FADE = 1111;

// mistake = {};

function mis(char) {
  if (char in mistake)
    mistake[char] += 1;
  else
    mistake[char] = 1;
  $('#stat #' + char + ' #mis').text(mistake[char]);
  $.ajax({method: 'PUT', url: `/mis/${char}/${mistake[char]}`});
}

// correct = {};

function cor(char) {
  if (char in correct)
    correct[char] += 1;
  else
    correct[char] = 1;
  $('#stat #' + char + ' #corr').text(correct[char]);
  $.ajax({method: 'PUT', url: `/corr/${char}/${correct[char]}`});
}

// complete = {};

function compl(char) {
  if (char in complete)
    complete[char] += 1;
  else
    complete[char] = 1;
  $('#stat #' + char + ' #compl').text(complete[char]);
  $.ajax({method: 'PUT', url: `/compl/${char}/${complete[char]}`});
}

function rnd(min, max) {
  // https://learn.javascript.ru/task/random-int-min-max
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

last = undefined;
function randvoc() {
  var char = keys[rnd(0, keys.length - 1)];
  if (char == last)
    return randvoc();
  else {
    last = char;
    return char;
  };
}

const sock = new WebSocket('ws://' + location.host + '/sock');

console.log(sock);

sock.onclose = e => {
  window.location.reload();
};

sock.onmessage = e => {
  console.log(e.data);
};

function w() {
  return Math.min(window.innerWidth, window.innerHeight / 2)
}

function timer(count) {
  if (count > 0) {
    // console.log(count);
    $('#count').text(count);
    setTimeout(timer(count - 1), 1111);
  }
}

function nextQuiz() {
  // clear
  $('#hanzi').empty();
  // next hanzi
  var hanzi = HanziWriter.create('hanzi', randvoc(), {
    width: w(),
    height: w(),
    strokeColor: '#444',
    radicalColor: '#445',
    padding: 0,
    strokeAnimationSpeed: 1.1,  // 5x normal speed
    delayBetweenStrokes: 10,    // milliseconds
    highlightOnComplete: true,
    // showCharacter: false,
    showOutline: false,
    charDataLoader: (char, onComplete) => {
      $.getJSON(`/hanzi/${char}.json`, (charData) => {
        onComplete(charData);
      });
    }
  });
  // animate & quiz
  hanzi.animateCharacter({
    onComplete: () => {
      timer(11);
      hanzi.quiz({
        onMistake: (strokeData) => {
          console.log('onMistake:', strokeData);
          mis(strokeData.character);
        },
        onCorrectStroke: (strokeData) => {
          console.log('onCorronCorrectStroke', strokeData);
          cor(strokeData.character);
        },
        onComplete: (summaryData) => {
          console.log('onComplete:', summaryData);
          compl(summaryData.character);
          // $('#hanzi').fadeOut(FADE).fadeIn(FADE);
          setTimeout(() => {
            $('#go').trigger('click');
          }, FADE * 1);
        }
      });
    }
  });
}

function statInit() {
  keys.forEach(char => {
    $('#stat tr:last')
        .after(`
          <tr id=${char}>
            <td          class=col-3>${char}</td>
            <td id=mis   class=col-3>${mistake[char] ? mistake[char] : ''}</td>
            <td id=corr  class=col-3>${correct[char] ? correct[char] : ''}</td>
            <td id=compl class=col-3>${
            complete[char] ? complete[char] : ''}</td>
          </tr>`);
  });
}

function resize() {
  ww = w();
  vv = window.innerWidth - ww * 1.05;
  console.log('resize', ww);
  $('#hanzi').width(ww);
  $('#hanzi').height(ww);
  $('#buts').css({'width': ww + 'px'});
  if (window.innerWidth >= 2 * ww) {
    $('#ctl').css({'position': 'absolute', 'top': 0, 'right': 0});
    $('#ctl').css({'width': vv + 'px'});
    $('#stat').css({'width': vv + 'px'});
  } else {
    $('#ctl').css({'position': 'relative', 'top': 0, 'right': 0});
    $('#ctl').css({'width': ww + 'px'});
    $('#stat').css({'width': ww + 'px'});
  }
  // $('#hanzi #a').attr('x1',0);
  // $('#hanzi #a').attr('y1',0);
  // $('#hanzi #a').attr('x2',ww);
  // $('#hanzi #a').attr('y2',ww);
}


$(() => {
  statInit();
  //
  window.onresize = resize;
  $(window).trigger('resize');
  //
  $('#go').on('click', (e) => nextQuiz());
  $('#go').trigger('click');
});
