var $messages = $('.messages-content'),
    d, h, m, Fake, noBadWords,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(fakeMessage, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar('update')
    .mCustomScrollbar('scrollTo', 'bottom', {
      scrollInertia: 10,
      timeout: 0
  });
}

function setDate() {
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(insertMessage);
$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

Fake = [
  'اهلا يا مازن', 
  'تعرف سلمان الخول 😂', 
  'خليه ينيكك يبنل متنكه', 
  'دنا بنيكك يا خول', 
  'يبنل متنكه يبو كس', 
  'كسمك رهيب', 
  'يبن مايا خليفه المعرصه', 
  'دنا بنيك امك المتناكه', 
  'مص زبي يبنل خول', 
  'يا متناك', 
  'انا اعرف امك فين يبنل متنكهه', 
  'امك بتلعب في كسها الاحمر', 
  'يبنل متنكه يا عرص', 
  'كسم امك يا خول يبنل متنكه هنيك ام الي مينكش كسمك يا عرص يبنل خول دنا بنيكك يبنل متنكه متشوفش نفسك يا متناك لحد زبي فطيزك وطيز امك يا بضان يبنل متنكه يا عرص يبنل عرص يا متناك', 
  'تدري ان امك بنت متناكه وبتحب تتناك يبنل خول ', 
  'خلاص يكسمك زهقت منك يبنل متناكه يا متناك يا عرص يبنل خول هروح انا ', 
  'اشوف كس امك علي خير يا متناك '
];

noBadWords = {
  bad: ['كسمك', 'غبي', 'تافه', 'حمار', 'وسخ', 'حيوان', 'خروف'],
  response: ['كسمين امك', 'انت ليه كذا', 'الكلام الحلو احسن من ذا', 'ترى الادب زين']
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function myResponse() {
  var iValue = $('.message-input').val();
  if (isInArray(iValue, noBadWords.bad)) {
    return noBadWords.response[Math.floor(Math.random() * noBadWords.response.length)] + "<br/>" + Fake[i];
  } else {
    return Fake[i];
  }
}

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new">'
    + '<figure class="avatar">'
      + '<img src="https://e.top4top.io/p_3362beujc1.png" />'
    + '</figure>'
    + '<span></span>'
  + '</div>').appendTo($('.mCSB_container'), updateScrollbar);
  
  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new">'
      + '<figure class="avatar">'
        + '<img src="https://e.top4top.io/p_3362beujc1.png"/>'
      + '</figure>'
      + myResponse()
    + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100); 
};