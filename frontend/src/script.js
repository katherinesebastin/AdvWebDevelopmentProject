document.addEventListener('DOMContentLoaded', () => {
    const modifyBtn = document.getElementById('modifyBtn');
    const modifySection = document.getElementById('modifySection');
    const campaignList = document.getElementById('campaignList');
    const addCampaignBtn = document.getElementById('addCampaignBtn');
  
    // Fetch campaigns from backend
    async function fetchCampaigns() {
      const response = await fetch('http://localhost:5001/campaigns');
      const campaigns = await response.json();
      
      // Clear any previous campaigns
      campaignList.innerHTML = '';
  
      // Display all campaigns as a list
      campaigns.forEach(campaign => {
        const campaignDiv = document.createElement('div');
        campaignDiv.classList.add('campaign-item');
        campaignDiv.innerHTML = `
          <span class="campaign-name" data-id="${campaign.id}" contenteditable="false">${campaign.name}</span>
          <button class="deleteBtn" data-id="${campaign.id}" style="display: none;">Delete</button>
        `;
        campaignList.appendChild(campaignDiv);
      });
  
      // Reapply delete button visibility if in Modify mode
      if (modifyBtn.textContent === 'Exit') {
        document.querySelectorAll('.deleteBtn').forEach(btn => {
          btn.style.display = 'inline'; // Ensure delete buttons are visible in Modify mode
        });
      }
    }
  
    // Toggle modify section visibility (this is only for the modify/add functionality)
    modifyBtn.addEventListener('click', () => {
      const isModifyMode = modifyBtn.textContent === 'Modify';
      if (isModifyMode) {
        // Enable Modify Mode
        modifySection.style.display = 'block';
        modifyBtn.textContent = 'Exit'; // Change button text to 'Exit'
  
        // Show the delete buttons only
        document.querySelectorAll('.deleteBtn').forEach(btn => {
          btn.style.display = 'inline'; // Show delete button
        });
      } else {
        // Exit Modify Mode
        modifySection.style.display = 'none';
        modifyBtn.textContent = 'Modify'; // Revert back to 'Modify'
  
        // Hide the delete buttons
        document.querySelectorAll('.deleteBtn').forEach(btn => {
          btn.style.display = 'none'; // Hide delete button
        });
      }
    });
  
    // Add new campaign button
    addCampaignBtn.addEventListener('click', async () => {
      const newCampaignName = prompt('Enter new campaign name:');
      if (newCampaignName) {
        const response = await fetch('http://localhost:5001/campaigns', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newCampaignName }),
        });
        const newCampaign = await response.json();
        fetchCampaigns(); // Refresh the campaign list
      }
    });
  
    // Delete campaign button
    campaignList.addEventListener('click', async (event) => {
      if (event.target.classList.contains('deleteBtn')) {
        const campaignId = event.target.getAttribute('data-id');
        const response = await fetch(`http://localhost:5001/campaigns/${campaignId}`, {
          method: 'DELETE',
        });
        if (response.status === 204) {
          fetchCampaigns(); // Refresh the campaign list after deletion
        }
      }
    });
  
    // Edit campaign name on click (inline editing)
    campaignList.addEventListener('click', async (event) => {
      if (event.target.classList.contains('campaign-name')) {
        const campaignId = event.target.getAttribute('data-id');
        const originalName = event.target.textContent;
  
        // Make the campaign name editable
        event.target.contentEditable = true;
        event.target.focus();
  
        // Handle loss of focus (when the user clicks outside or presses Enter)
        event.target.addEventListener('blur', async () => {
          const updatedName = event.target.textContent.trim();
          
          if (updatedName && updatedName !== originalName) {
            // Send PATCH request to update the campaign name
            const response = await fetch(`http://localhost:5001/campaigns/${campaignId}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: updatedName }),
            });
  
            if (response.status === 200) {
              fetchCampaigns(); // Refresh the campaign list after renaming
            } else {
              // If the request fails, revert the name back
              event.target.textContent = originalName;
            }
          } else {
            // If no changes were made, revert back to original name
            event.target.textContent = originalName;
          }
  
          // Make the campaign name non-editable again
          event.target.contentEditable = false;
        });
  
        // Allow editing the name with the Enter key
        event.target.addEventListener('keypress', async (e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission or new line
  
            const updatedName = event.target.textContent.trim();
            if (updatedName && updatedName !== originalName) {
              // Send PATCH request to update the campaign name
              const response = await fetch(`http://localhost:5001/campaigns/${campaignId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: updatedName }),
              });
  
              if (response.status === 200) {
                fetchCampaigns(); // Refresh the campaign list after renaming
              } else {
                // If the request fails, revert the name back
                event.target.textContent = originalName;
              }
            } else {
              // If no changes were made, revert back to original name
              event.target.textContent = originalName;
            }
  
            // Make the campaign name non-editable again
            event.target.contentEditable = false;
          }
        });
      }
    });
  
    // Initial fetch of campaigns
    fetchCampaigns();
});
