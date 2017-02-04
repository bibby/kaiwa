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

結子 = ゆこ = Yuko = Char("f1");
亜伽利 = あかり = Akari = Char("f2");
介人 = かいと = Kaito = Char("f3");
英 = はな = Hana = Char("f4");

顛 = とうま = Touma = Char("f5");
惟 = ゆい = Yui = Char("f6");
允人 = まさと = Masato = Char("f7");
八良 = はちろう = Kanna = Char("f8");


var Kaiwa = function()
{
  if (false == this instanceof Kaiwa)
    return new Kaiwa();

  this.pos = 1;
};



Kaiwa.prototype = {
  init: function()
  {
    var header = trim($("#header").val());
    if(header)
      this.header(header);

    var dialog = $("#dialog-text").val();
    var actor;
    var lines = [];
    dialog.split("\n").forEach(function(line)
    {
      line = trim(line);
      if(!line)
        return;

      var act = undefined;
      var parts = line.split(/\:\s*/);
      if(parts.length == 2)
      {
        act = get_actor(parts.shift());
        line = parts.shift();
        if(act && line)
        {
          actor = act;
          lines.push([actor, line]);
        }
      }

      if(!act)
        lines[lines.length - 1].push(line);
    });

    this.sayAll(lines);
    return this;
  },
  clear:function()
  {
    $("#dialog").empty();
    return Kaiwa();
  },
  rebuild:function()
  {
    return this.clear().init();
  },
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
  header: function(text)
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


var trim = function(str)
{
    return str.toString().replace(/^\s+|\s+$/g, '');
};

var get_actor = function(act)
{
  return window[act] || null;
};


$(function()
{
  window.kaiwa = Kaiwa().init();
  $("#dialog-text, #header").blur(function()
  {
    kaiwa.rebuild();
  })
});
