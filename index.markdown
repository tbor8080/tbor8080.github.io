---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
<script src="/assets/javascript/crypt/sha.js" type="text/javascript"></script>
<script>
    auth=prompt("パスワード:");
    var sha256 = new jsSHA('SHA-256', "TEXT", {eccoding:'UTF-8'});
    sha256.update(auth);
    var digest = sha256.getHash("HEX");
    // Easy authlize
    // 本番 - sha 256
    location.href="page/"+digest+"/"
    // debug print
</script>
