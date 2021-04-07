var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')



http
    .createServer(function(req,res){
        var urls = res.url;
        var parseObj = url.parse(req.url, true)

        var pathname = parseObj.pathname
        if (pathname === '/TamJei'){
            
            fs.readFile('./Backend.html', function(err, data){
                if (err){
                    return res.end('404 Not Found.')
                } else{
                    var food = fs.readFileSync('./orders.json');
                    var orders = JSON.parse(food)

                    var order = template.render(data.toString(),{
                    orders : orders
                })

                res.end (order)
                }


            });

        }else if (pathname === '/deliveroo'){
            fs.readFile('./Frontend.html',function(err, data){
                if(err){
                    return res.end('404 Not Found.')
                }

                res.write(data)

            })


        }else if (pathname ==='/order'){
            var food = fs.readFileSync('./orders.json');
            var orders = JSON.parse(food)
            var order = parseObj.query
            orders.unshift(order)

            var input = JSON.stringify(orders)
            fs.writeFileSync('./orders.json', input);
            console.log('order incoming......')
            res.statusCode = 302
            res.setHeader('Location', '/Thanksfororder')
            res.end()


        } else if(pathname==='/Thanksfororder'){
            fs.readFile('./thankspage.html',function(err,data){
                if(err){
                    return res.end('404 Not Found.')
                }else{
                    res.end(data)
                }
            })
        }

        else if (pathname ==='/Deliveroo.jpg'){
            fs.readFile('./Deliveroo.jpg','binary', function(err,data){
                res.end(data,'binary')
            })
        }
        else if (pathname ==='/TamJei.jpg'){
            fs.readFile('./TamJei.jpg','binary', function(err,data){
                res.end(data,'binary')
            })
        }
        else{

            fs.readFile('./404.html', function(err, data){
                if(err){
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        }
    })
    .listen(3000, function(){
        console.log('running.....')
    })
