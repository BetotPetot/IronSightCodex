$(document).ready(function () {
    const $collections = $("#collection-list");
    const $toggleButton = $("#toggle-collections");

    // Pastikan daftar koleksi terlihat saat halaman dibuka.
    $collections.stop(true, true).show();

    $toggleButton.text("HIDE COLLECTIONS");

    $toggleButton.on("click", function () {
        $collections.stop(true, true).slideToggle(300, function () {
            const isVisible = $collections.is(":visible");

            $toggleButton.text(
                isVisible ? "HIDE COLLECTIONS" : "SHOW COLLECTIONS"
            );
        });
    });
});
