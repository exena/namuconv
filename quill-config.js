//**********************************************************************************************
//custom button functions
var codeBlock = Quill.import('formats/code-block');

class namuH2 extends codeBlock {
}

namuH2.blotName = "insert-namuH2";
namuH2.tagName = "pre";
namuH2.className = "namuH2";

Quill.register('formats/namuH2', namuH2);
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
Quill.register(Link, true); //덮어씌움
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

Quill.register(CustomBlock, true); // 덮어씌움
//**********************************************************************************************
//custom font size
var Size = Quill.import('attributors/style/size');
Size.whitelist = ['0.56rem','0.583rem','0.668rem','0.75rem','0.833rem','0.9rem','1.16rem','1.25rem','1.332rem','1.417rem','1.5rem'];
Quill.register(Size, true); // 덮어씌움
//**********************************************************************************************
var quill;
$('.quill-editor').each(function(i, el) {//index, element
    var el = $(this), id = 'quilleditor-' + i, val = el.val(), editor_height = '100%';
    var div = $('<div/>').attr('id', id).css('height', editor_height).html(val);
    el.addClass('d-none');
    el.parent().append(div);

    quill = new Quill('#' + id, {
        modules:{ 
          toolbar: {container:'#toolbar'},
          blotFormatter: { specs: [ CustomImageSpec ] }
        },
        theme: 'snow'
    });
    
});
