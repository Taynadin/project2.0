
jQuery(document).ready(function($){
    // Modal
    $('#info').click(function(){
        $('#myModal').css('display','block');
    });
    $('.close').click(function (){
        $('#myModal').css('none');
    });

    // Calendar
    $('.datepicker').datepicker({
      autoclose: true,
      todayBtn: 'linked'
    });
   
    $('#guests').on('keyup change', function(e) {
      if( $(this).val() > 99 ) {
        $(this).val(99);
      }
    });
    // Homepage Animation
    setTimeout(() => {
        $('h1, .search-box').addClass("showing");
    }, 0);

    //   News API
    // https://newsapi.org/

    var apiKey = 'f85c354a1dc84fe0b17b95c83f03da12';
    var queryURL = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' + apiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET",
        error: function() {
          console.log("error");
        },
        success: function(data) {
          processData(data);
          newsData(data);
          
        }
      });
      
    function processData(data) {
    
    for (var i = 0; i < 3; i++) {
        var image = data.articles[i].urlToImage;
        var date = moment(data.articles[i].publishedAt).format('MMMM Do');
        var title = data.articles[i].title;
        var description = data.articles[i].description;
        var url = data.articles[i].url;

        var newsBlock = `
        <div class="article col-sm-4">
            <article class="news-item">
                <img src="${image ? image : 'http://placehold.it/300x250'}" width="300" height="250" id="blogImage">
                <div class="overlay-blog">
                    <span class="date" id="date">${date}</span>
                </div>
                <h5 id="title"> ${title} </h5>
                <p id="description"> ${description}</p>
                <a href="${url}"><button id="url"> Read More </button></a>
            </article>
            </div>`
    
            $('#newsList').append(newsBlock); 
        }
    }
    function newsData(data) {
        for (var i = 0; i < data.articles.length; i++) {
            var image = data.articles[i].urlToImage;
            var date = moment(data.articles[i].publishedAt).format('MMMM Do');
            var title = data.articles[i].title;
            var description = data.articles[i].description;
            var url = data.articles[i].url;
    
            var newsBlock = `
            <div class="article col-sm-4">
                <article class="news-item">
                    <img src="${image ? image : 'http://placehold.it/300x250'}" width="300" height="250" id="blogImage">
                    <div class="overlay-blog">
                        <span class="date" id="date">${date}</span>
                    </div>
                    <h5 id="title"> ${title} </h5>
                    <p id="description"> ${description}</p>
                    <a href="${url}"><button id="url"> Read More </button></a>
                </article>
                </div>`
        
                $('#newsBlock').append(newsBlock); 
            }

    }

    $.ajax({
        url: '/api/properties',
        method: "GET",
        error: function() {
          console.log("error");
        },
        success: function(data) {
          renderProperties(data);
        }
      });

      function renderProperties(data){
          
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            var address = data[i].address;
            var bedroom = data[i].bedroom;
            var bathroom = data[i].bathroom;
            var guest= data[i].guest;
            var price = data[i].price;
            var image = data[i].image
    
            var allPropertiesBlock = `
            <div class="col-md-4">
                <div class="home-item" id="propertiesRender">
                    <div class="home-image">
                        <a href="/property?id=${id}"><img src="${image ? image : "assets/images/blog3.jpg"}" height="280" /></a>
                        <div class="overlay-info">
                            <div class="home-price">
                                <span>$${price} /Day</span>
                            </div>
                        </div>
                    </div>
                    <div class="home-info">
                        <ul>
                            <li class="home-address">${address} </li>
                            <li class="home-details">
                            <i class="fas fa-bed"></i><span> ${bedroom} Bedrooms</span>
                            <i class="fas fa-bath"></i><span> ${bathroom} Bathrooms</span>
                            <i class="fas fa-users"></i><span> ${guest} Guests </span>
                            </li>
                            <li class="home-type"> Rental</li>
                        </ul>
                    </div>
                </div>
            </div>`
        
            $('#propertiesRender').append(allPropertiesBlock); 
        }
      }

    // Submit Property Form 
    $('#submitForm').submit(function(e){
        e.preventDefault();

         var address = $(this).find('[name="address"]').val();
         var city = $(this).find('[name="city"]').val();
         var zipcode = $(this).find('[name="zipcode"]').val();
         var bedroom = $(this).find('[name="bedroom"]').val();
         var bathroom = $(this).find('[name="bathroom"]').val();
         var guest = $(this).find('[name="guest"]').val();
         var description = $(this).find('[name= "description"]').val();
         var price = $(this).find('[name= "price"]').val();
         var image = $(this).find('[name= "image"]').val();
            
        $.ajax({
            url: `/api/properties`,
            type: 'POST',
            data: {
                address: address,
                city: city,
                zipcode: zipcode,
                bedroom: bedroom,
                bathroom: bathroom,
                guest: guest,
                description: description,
                price: price,
                image: image
                
            },
            error: function() {
                swal("Sorry!", "Image is too big", "error")
                console.log("error");
              },
            }).then(function() {
                
            swal("Good job!", "The house has been added sucessfully!", "success")
            .then((value) => {
                window.location.reload();

            });


            
        });

    });

    //   Populating information to Single Property Page
    var currentURL = window.location.href;
    var url = new URL(currentURL);
    var property_id = url.searchParams.get("id");
    
    if(property_id) {
        $.ajax({
            url: `/api/properties/${property_id}`,
            method: "GET",
            error: function() {
                console.log("error");
            },
            success: function(data) {
                var property = data[0];
                
                var id = property.id;
                var address = property.address;
                var city = property.city;
                var zipcode = property.zipcode;
                var bedroom = property.bedroom;
                var bathroom = property.bathroom;
                var guest= property.guest;
                var description = property.description;
                var price = property.price;
                var image = property.image

                $("#singleAddress").text(address);
                $("#singleCity").text(city);
                $("#singleZipcode").text(zipcode);
                $("#singleBedroom").text(bedroom);
                $("#singleBathroom").text(bathroom);
                $("#singleGuest").text(guest);
                $("#singleDescription").text(description);
                $("#singlePrice").text(price);
                $("#singlePrice1").text(price);
                $("#singleImage").attr('src', image ? image : 'assets/images/blog3.jpg' );
            }
        });
    }

    //  Show Similar Properties on Homepage and Single Property 
    $.ajax({
        url: '/api/properties',
        method: "GET",
        error: function() {
          console.log("error");
        },
        success: function(data) {
          renderSimilarProperty(data);
        }
      });

      function renderSimilarProperty(data){
          
        for (var i = 0; i < 3; i++) {
            var id = data[i].id;
            var address = data[i].address;
            var bedroom = data[i].bedroom;
            var bathroom = data[i].bathroom;
            var guest= data[i].guest;
            var price = data[i].price
            var image = data[i].image
    
            var allPropertiesBlock = `
            <div class="col-md-4">
                <div class="home-item">
                    <div class="home-image">
                        <a href="/property?id=${id}"><img src="${image ? image : "assets/images/blog3.jpg"}" height="280" /></a>
                        <div class="overlay-info">
                            <div class="home-price">
                                <span>$${price} /Day</span>
                            </div>
                        </div>
                    </div>
                    <div class="home-info">
                        <ul>
                            <li class="home-address">${address} </li>
                            <li class="home-details">
                            <i class="fas fa-bed"></i><span> ${bedroom} Bedrooms</span>
                            <i class="fas fa-bath"></i><span> ${bathroom} Bathrooms</span>
                            <i class="fas fa-users"></i><span> ${guest} Guests </span>
                            </li>
                            <li class="home-type"> Rental</li>
                        </ul>
                    </div>
                </div>
            </div>`
            
            $('.propertiesRender1').prepend(allPropertiesBlock); 
        }
      }


    //   Form Image 
    function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.formImage').attr('src', e.target.result);
            $('#image_url').val( e.target.result );
        }

        reader.readAsDataURL(input.files[0]);
        
    }
}
        $("#imageInput").change(function(){
            readURL(this);
        });



        // Contact Email Page

       $('#form').submit(function(e){
        e.preventDefault();
        var name = $(this).find('[name="name"]').val(); 
        var email = $(this).find('[name="email"]').val(); 
        var subject = $(this).find('[name="subject"]').val(); 
        var message = $('textarea#message').val();

        console.log(email,name, subject,message)
        $.ajax({
        url: `/api/contact`,
        type: 'POST',
        data: {
            name: name,
            email: email,
            subject: subject,
            message: message,
   
            
        },
        error: function() {
            console.log("error");
            },
        }).then(function() {
            
        swal("Good Job!", "The email has been send sucessfully!", "success")
        .then((value) => {
            window.location.reload();
        });

    });
});

function book(){
    var checkIn = $('#sCheckIn').val();
    var checkOut = $('#sCheckOut').val();
    var days = $('#totalDay').val();
    var price = $('#singlePrice1').text();

    var a = moment(checkIn);
    var b = moment(checkOut);
    var totalDays = b.diff(a, 'days') 
    var grandTotal = (totalDays * price) 

    if (grandTotal < 0) {
        swal("Sorry!", "Please select correct date", "error")
        return
    }
    $("#totalDay").text(totalDays)
    $(".reqPrice").text("$" + grandTotal);
    
}

    $('#sCheckIn, #sCheckOut').change(function() {
        if( $('#sCheckIn').val() && $('#sCheckOut').val() ) {
            book();
        }
    });

    $('#requestForm').submit(function(e){
        e.preventDefault();
        var name = $(this).find('#reqName').val(); 
        var email = $(this).find('#reqEmail').val(); 
        var totalPrice = $(this).find('.reqPrice').text(); 
        var checkIn = $('#sCheckIn').val();
        var checkOut = $('#sCheckOut').val();
        var address = $('#singleAddress').text();
        var city = $('#singleCity').text();
        var zipcode = $('#singleZipcode').text();

        $.ajax({
        url: `/api/request`,
        type: 'POST',
        data: {
            name: name,
            email: email,
            totalPrice: totalPrice,
            checkIn: checkIn,
            checkOut: checkOut,
            address: address,
            city: city,
            zipcode: zipcode,

            
        },
        error: function() {
            console.log("error");
            },
        }).then(function() {
            
        swal("Good Job!", "Your request has been send sucessfully!", "success")
        .then((value) => {
            window.location.reload();
        });

    });
});


});
  
