<script>
    // 1. Mocking a relational database response matching our programmatic conditions
    const mockProviders = [
        {
            id: 101,
            name: "Parkview Behavioral Health Institute",
            score: 4.88,
            reviews: 142,
            insurance: "Anthem PPO In-Network",
            hasActiveReferralTier: true // <-- Renders the software booking widget
        },
        {
            id: 102,
            name: "Maple Heights Behavioral Health",
            score: 4.45,
            reviews: 68,
            insurance: "Anthem PPO In-Network",
            hasActiveReferralTier: false // <-- Omit the widget, forces clean data display only
        },
        {
            id: 103,
            name: "Allendale Treatment & Crisis Stabilization",
            score: 4.12,
            reviews: 29,
            insurance: "Anthem PPO In-Network",
            hasActiveReferralTier: false
        }
    ];

    let targetedFacilityId = null;

    // 2. Render Loop Processor
    function renderDirectory() {
        const container = document.getElementById('directory-container');
        container.innerHTML = ''; // Clear DOM state

        mockProviders.forEach((provider, index) => {
            const card = document.createElement('div');
            card.className = 'card';

            // Check configuration layer to decide which UI layout block to mount
            const interactionBlock = provider.hasActiveReferralTier 
                ? `<button class="cta-btn" onclick="openModal(${provider.id}, '${provider.name}')">Verify Benefits & Request Placement</button>`
                : `<div class="unclaimed-text">Unclaimed Profile. Contact this facility directly to check current structural bed availability metrics.</div>`;

            card.innerHTML = `
                <div class="rank-tag">Platform Quality Rank #${index + 1}</div>
                <h2 class="facility-name">${provider.name}</h2>
                <div class="meta-row">
                    <div class="meta-item">★ <strong>${provider.score}</strong> Score</div>
                    <div class="meta-item">• ${provider.reviews} Verified Reviews</div>
                    <div class="meta-item">✔ ${provider.insurance}</div>
                </div>
                ${interactionBlock}
            `;
            container.appendChild(card);
        });
    }

    // 3. UI State Interactions
    function openModal(id, name) {
        targetedFacilityId = id;
        document.getElementById('modal-facility-title').innerText = `Secure Referral: ${name}`;
        document.getElementById('intake-modal').style.display = 'flex';
    }

    function closeModal() {
        document.getElementById('intake-modal').style.display = 'none';
        document.getElementById('intake-form').reset();
        targetedFacilityId = null;
    }

    // 4. Form Pipeline Event Handler
    document.getElementById('intake-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const payload = {
            facilityId: targetedFacilityId,
            patientName: document.getElementById('patient-name').value,
            insuranceId: document.getElementById('insurance-id').value,
            phone: document.getElementById('callback-phone').value
        };

        // Visual confirmation mimicking backend processing execution
        alert(`SUCCESS:\nSecure package successfully routed to database pipelines for processing.\n\nTarget Facility ID: ${payload.facilityId}\nPatient: ${payload.patientName}\nRouting endpoint firing...`);
        
        closeModal();
    });

    // Run the engine loop on window load initialization
    window.onload = renderDirectory;
</script>
