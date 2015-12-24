var h = require('hyperscript');

module.exports = function(files) {
  return h('ul',
           files.map(function(f) {
             return h('li',
                      h('a', {href: f.audio_url},
                        h('h3', f.title)),
                      h('img', {src: f.img_url}),
                      h('a.author', {href: f.contact}, f.author),
                      h('p.description', f.description),
                      h('div.length',
                        h('span', "length:"),
                        h('span', f.length)
                      ),
                      h('div.created',
                        h('span', "created:"),
                        h('span', f.created)
                      ),
                      getTags(f.tags),
                      h('iframe', {src: 'http://localhost:8000/embed/map/', style: {width: '825px',
                                                                          height: '816px'}})
             )
           })
  );
}

function getTags(tags) {
  return h('div.tags',
           tags.map(function(t) {
             return h('a', {href:"/tags/"+t}, t);
           })
  )
}
