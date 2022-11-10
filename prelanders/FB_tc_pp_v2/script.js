html = `<div class="comment">
    <img alt="profileImage" class="comment-img" src="{{img_assets}}/amelie.jpg">
    <div class="desc">
        <span><b>Amelie Gibson</b></span><img src="{{img_assets}}/verified.png" class="vicon" alt=""><span class="vtext">Verified</span>
        <span class="comment-rating"><img src="{{img_assets}}/star-5.png" class="comment-rating-img" alt=""><span class="comment-time f1-date"> 4 minutes ago</span></span>

        <p>I have already received my gift card. Thanks so much !!!</p>
    </div>
</div>

<div class="comment">
    <img alt="profileImage" class="comment-img" src="{{img_assets}}/braxton.jpg">
    <div class="desc">
        <span><b>Braxton Stone</b></span><img src="{{img_assets}}/verified.png" class="vicon" alt=""><span class="vtext">Verified</span>
        <span class="comment-rating">
            <img src="{{img_assets}}/star-5.png" class="comment-rating-img" alt="">
            <span class="comment-time f2-date">
                20 minutes ago
            </span>
        </span>

        <p>Amazing, my &pound;500 gift card was delivered this morning &#128591;&#128293;</p>
    </div>
</div>

<div class="comment">
    <img alt="profileImage" class="comment-img" src="{{img_assets}}/sophia.jpg">
    <div class="desc">
        <span><b>Sophia Cameron</b></span><img src="{{img_assets}}/verified.png" class="vicon" alt=""><span class="vtext">Verified</span>
        <span class="comment-rating"><img src="{{img_assets}}/star-5.png" class="comment-rating-img" alt=""><span class="comment-time f3-date">2 hours ago</span></span>

        <p>At first I thought it was a joke, but I actually got my gift card. I told my friends so they can get freebies too. &#128515;</p>

    </div>
</div>

<div class="comment">
    <img alt="profileImage" class="comment-img" src="{{img_assets}}/david.jpg">
    <div class="desc">
        <span><b>David Robinson</b></span><img src="{{img_assets}}/verified.png" class="vicon" alt=""><span class="vtext">Verified</span>
        <span class="comment-rating"><img src="{{img_assets}}/star-5.png" class="comment-rating-img" alt=""><span class="comment-time f4-date">3 hours ago </span></span>

        <p>They delivered my gift card this morning and now I just want to complete more questionnaires!</p>
    </div>
</div>`;
        $('#comment-page').html(html.replaceAll('{{img_assets}}','/prelanders/FB_tc_pp_v2/'));