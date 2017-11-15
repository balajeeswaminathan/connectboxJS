<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<body>
<script id="viewPhotos-hb-template" type="text/x-handlebars-template">
    <div class="connUs-viewPtos-cont">
        {{#if data}}
            <div class="connUs-viewPtos-innerWrapper">
                {{#if data.photosList}}
                    {{#each data.photosList}}
                        <div class="connUs-viewPtos-innerCont" imgId="{{_id}}">
                            <img class="connUs-viewPtos-Img" src="{{imgUrl}}" imgIdx="{{@index}}"/>
                        </div>
                    {{/each}}
                {{/if}}
            </div>
        {{/if}}
    </div>

    <div class="connUs-galleryPtos-cont">
        {{#if data}}
            {{#if data.photosList}}
                 <div class="connUs-galleryPtos-innerCont" id="imgSlides">
                    {{#each data.photosList}}
                        <img src="{{imgUrl}}" imgId="{{_id}}"/>
                    {{/each}}
                 </div>
            {{/if}}

            <div class="connUs-galleryPtos-details-cont">
                {{#if data.photosList}}
                   {{#each data.photosList}}
                     <div class="connUs-galleryPtos-details-dynInnerCont" descIdx="{{@index}}">
                            <div class="connUs-galleryPtos-desc">{{desc}}</div>
                            <div class="connUs-galleryPtos-dateAndTime">{{dateAndTime}}</div>
                            <div class="connUs-galleryPtos-likeCount"></div>
                     </div>
                   {{/each}}
                {{/if}}
                <div class="connUs-galleryPtos-likeBtn">Like</div>
                <div class="connUs-galleryPtos-viewMoreLikesBtn">view more Likes</div>
                <div class="connUs-galleryPtos-likeWrapper"></div>
                <div class="connUs-galleryPtos-cmntsWrapper"></div>
                <div class="connUs-galleryPtos-viewMoreCmntsBtn">view more comments</div>
                <input type="text" class="connUs-galleryPtos-cmntsTxt" placeholder="Add your comments"/>
                <div class="connUs-galleryPtos-addCmntsBn">Add comments</div>
            </div>
        {{/if}}
    </div>
</script>
</body>
</html>