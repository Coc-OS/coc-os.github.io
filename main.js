function changeTheme(that) {
  const themeName = that.getAttribute('themeName');
  const previewImage = document.getElementById('previewImage');
  const themeStatus = document.getElementById('themeStatus');

  document.body.className = themeName;

  that.parentElement.childNodes.forEach((child) => {
    if (child.classList?.contains('theme-btn--active')) {
      child.classList.remove('theme-btn--active');
    }
  });
  that.classList.add('theme-btn--active');

  let previewImgSrc = null;
  switch (themeName) {
    case 'silver-theme':
      previewImage.src = 'assets/preview-silver.png';
      themeStatus.textContent = 'Selected: Silver'
      previewImgSrc = 'assets/preview-silver.png';
      break;
    case 'dark-theme':
      previewImage.src = 'assets/preview-dark.png';
      themeStatus.textContent = 'Selected: Dark'
      previewImgSrc = 'assets/preview-dark.png';
      break;
    case 'butter-theme':
      previewImage.src = 'assets/preview-butter.png';
      themeStatus.textContent = 'Selected: Butter'
      previewImgSrc = 'assets/preview-butter.png';
      break;
    default:
      previewImage.src = 'assets/preview-light.png';
      themeStatus.textContent = 'Selected: Light'
      previewImgSrc = 'assets/preview-light.png';
  }

  const featImgs = document.getElementsByClassName('feat-img');
  for (let featImg of featImgs) {
    featImg.src = previewImgSrc;
  }
}

function getSupporterProfile(supporter) {
  let profilePic = null
  if (typeof supporter.image === 'string') {
    profilePic = document.createElement('img');
    profilePic.src = supporter.image;
  } else {
    profilePic = document.createElement('div');
    profilePic.classList.add('text-s1')
    profilePic.textContent = supporter.name.slice(0, 2);
  }
  profilePic.classList.add('supporterProfile');
  const link = document.createElement('a');
  link.href = supporter.profile;
  link.target = '_blank';
  link.append(profilePic);
  link.title = supporter.name;
  return link;
}

async function loadSupport() {
  const supportOrg = document.getElementById('supportOrg');
  const supportInd = document.getElementById('supportInd');
  const ORGURL = 'https://opencollective.com/cinny/members/organizations.json';
  const INDURL = 'https://opencollective.com/cinny/members/users.json';

  const orgs= await (await fetch(ORGURL, { method: 'GET' })).json();
  orgs.forEach((org) => {
    if (org.totalAmountDonated === 0) return;
    supportOrg.append(getSupporterProfile(org));
  });

  const inds = await (await fetch(INDURL, { method: 'GET' })).json();
  inds.forEach((ind) => {
    if (ind.totalAmountDonated === 0) return;
    supportInd.append(getSupporterProfile(ind));
  });
}

loadSupport();