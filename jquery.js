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

    let toastTimer;

    function showToast() {
        const $toast = $("#form-toast");
        const $progress = $toast.find(".toast-progress");

        clearTimeout(toastTimer);

        $toast.removeClass("toast-visible");
        $progress.css("animation", "none");

        // Reset progress bar before restarting the toast.
        void $progress[0].offsetWidth;

        $progress.css("animation", "");

        $toast.addClass("toast-visible");

        toastTimer = setTimeout(function () {
            $toast.removeClass("toast-visible");
        }, 4000);
    }

    $("#close-toast").on("click", function () {
        clearTimeout(toastTimer);
        $("#form-toast").removeClass("toast-visible");
    });

    $("#collection-form").on("submit", function (event) {
        event.preventDefault();

        const fields = [
            {
                input: "#name",
                error: "#name-error",
                message: "Name is required."
            },
            {
                input: "#origin",
                error: "#origin-error",
                message: "Origin is required."
            },
            {
                input: "#category",
                error: "#category-error",
                message: "Please select a category."
            },
            {
                input: "#description",
                error: "#description-error",
                message: "Description is required."
            }
        ];

        let firstInvalid = null;

        fields.forEach(function (field) {
            const value = $(field.input).val().trim();
            const isInvalid = value === "";

            $(field.input).toggleClass("field-invalid", isInvalid);

            $(field.error)
                .text(isInvalid ? field.message : "")
                .toggle(isInvalid);

            if (isInvalid && firstInvalid === null) {
                firstInvalid = field.input;
            }
        });

        if (firstInvalid !== null) {
            $(firstInvalid).trigger("focus");
            return;
        }

        showToast();
    });


    // Clear the error when the user corrects a field.
    $("#name, #origin, #category, #description").on(
        "input change",
        function () {
            const value = $(this).val().trim();

            if (value !== "") {
                $(this).removeClass("field-invalid");
                $("#" + this.id + "-error").hide().text("");
            }
        }
    );

});
