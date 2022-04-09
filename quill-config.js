//**********************************************************************************************
//custom button functions
//var quill is at the last part of this file
function insertHeart() {
  const cursorPosition = quill.getSelection().index;
  quill.insertText(cursorPosition, "♥");
  quill.setSelection(cursorPosition + 1);
}
function insertNamuH2() {
  
}
//**********************************************************************************************
//image resizer module
Quill.register('modules/blotFormatter', QuillBlotFormatter.default);
class CustomImageSpec extends QuillBlotFormatter.ImageSpec {
    getActions() {
        return [QuillBlotFormatter.ResizeAction];
    }
}
//**********************************************************************************************
//Check if input is url or document name.
var Link = Quill.import('formats/link');
Link.sanitize = function(url) {
  let protocol = url.slice(0, url.indexOf(':'));
  if (this.PROTOCOL_WHITELIST.indexOf(protocol) === -1) {
    url = 'https://namu.wiki/w/' + url;
  }
  return url;
}
Quill.register(Link, true);
//**********************************************************************************************
//Make p block default font size "0.9rem".
const BlockPrototype = Quill.import("blots/block");

class CustomBlock extends BlockPrototype {
  constructor(domNode, value) {
    super(domNode, value);
    this.format("size", "0.9rem");
  }

  static tagName = "P";

  format(name, value) {
    if (name === "size") {
      this.domNode.style.fontSize = value;
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(CustomBlock, true);
//**********************************************************************************************
//custom font size
var Size = Quill.import('attributors/style/size');
Size.whitelist = ['0.56rem','0.583rem','0.668rem','0.75rem','0.833rem','0.9rem','1.16rem','1.25rem','1.332rem','1.417rem','1.5rem'];
Quill.register(Size, true);
//**********************************************************************************************
var quill;
$('.quill-editor').each(function(i, el) {//index, element
    var el = $(this), id = 'quilleditor-' + i, val = el.val(), editor_height = '100%';
    var div = $('<div/>').attr('id', id).css('height', editor_height).html(val);
    el.addClass('d-none');
    el.parent().append(div);

    quill = new Quill('#' + id, {
        modules:{ 
          toolbar: {container:'#toolbar',handlers: {'insertHeart': insertHeart}},
          blotFormatter: { specs: [ CustomImageSpec ] }
        },
        theme: 'snow'
    });
    
});
