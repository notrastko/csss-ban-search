async function search() {
    let username = document.getElementById("usernameInput").value.trim();
    if (!username) {
        alert("Please enter a username");
        return;
    }

    // Add #0 to the username if no # is added
    if (!username.includes("#")) {
        username += "#0";
    }

    const response = await fetch("https://api.jsonbin.io/v3/qs/660392622b1b334a633bf5b6");
    const responseData = await response.json();

    // Extract the record array from the response data
    const data = responseData.record;

    if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return;
    }

    const result = data.filter(record => record.fields.username === username);
    if (result.length > 0) {
        const banRecord = result[0].fields;
        const formattedBanDate = new Date(banRecord.ban_date).toLocaleString();

        document.getElementById("result").innerHTML = `
            <strong>Username:</strong> ${banRecord.username}<br>
            <strong>User ID:</strong> ${banRecord.user_id}<br>
            <strong>Ban Date:</strong> ${formattedBanDate}<br>
            <strong>Ban Reason:</strong> ${banRecord.reason}<br>
            <strong>Banned by Mod:</strong> ${banRecord.mod}
        `;
    } else {
        document.getElementById("result").innerHTML = "No ban record found for the given username.";
    }
}



