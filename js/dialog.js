var Char = function(cls)
{
  if (false == this instanceof Char)
    return new Char(cls);
  this.cls = cls;
};

Char.prototype = {
  draw: function(text, pos)
  {
    return $("<div/>")
    .addClass(["row", this.cls, pos].join(" "))
    .append(
      $("<div/>")
      .addClass("face")
    )
    .append(
      $("<p/>")
      .addClass("triangle-border")
      .html(text)
    );
  }
};

var Yuko = Char("f1");
var Akari = Char("f2");
var Kaito = Char("f3");
var Hana = Char("f4");

var Touma = Char("f5");
var Yui = Char("f6");
var Yuuto = Char("f7");
var Kanna = Char("f8");


var Kaiwa = function()
{
  this.pos = 1;
};

Kaiwa.prototype = {
  sayAll: function(lst)
  {
    var k = this;
    lst.forEach(function(l)
    {
      k.say.apply(k, l);
    });
  },
  say: function()
  {
    var args = Array.prototype.slice.call(arguments);
    var char = args.shift();
    var text = args.join("<br />");
    var pos = this.pos ? "left" : "right";
    this.pos = (this.pos + 1) % 2;
    this.draw(char.draw(text, pos));
  },
  nar: function(text)
  {
    var d = $("<div/>")
      .addClass("row")
      .append(
        $("<p/>")
        .addClass("triangle-obtuse top")
        .html(text)
      );

    this.draw(d);
  },
  draw: function(elm)
  {
    $("#dialog")
    .append(elm);
  }
};
