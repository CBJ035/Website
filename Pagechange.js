<script>
    document.querySelectorAll('header nav ul li a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Get target content ID
            const contentId = item.getAttribute('href').substring(1) + "-content";

            // Hide all content sections
            document.querySelectorAll('.content').forEach(section => {
                section.style.display = 'none';
            });

            // Show the clicked content section
            document.getElementById(contentId).style.display = 'block';
        });
    });
</script>
