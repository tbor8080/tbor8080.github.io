---
layout: default
permalink: "/page/d03eab31b5b90d813a988cfd78c4958fcf7ce460fdaa1bdde860ce682b846ad5/"
---
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type":"WebSite",
        "@id": "https://tbor8080.github.io",
        "name": "{{ title }}"
        "auther":{
            "@type": "Person",
            "@id": "https://tbor8080.github.io/#maker",
            "name": "Ryohei Suga"
        }
    }
</script>
<style type="text/css">
    .slide{
        width: 300px;
        height: 200px;
        overflow: hidden;
        margin: 0 auto;
    }

    .slider-inner {
        width: 300%;
        /*infinite or number[1...]*/
        animation: slider 6s 3 ease;
    }

    @keyframes slider {
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(1800px);
        }
        66% {
            transform: translateX(1200px);
        }
        100% {
            transform: translateX(0);
        }
    }
</style>
<ul class="slider">
{% for pot in site.data.portforio.lists %}
    <li class="slider-inner">
        <h4><a href="{{ pot.url }}" title="{{ pot.title }}" target="_blank">{{ pot.title }}</a></h4>
        <p>{{ pot.discription }}</p>
    </li>
{% endfor %}
</ul>