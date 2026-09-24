(() => {
  'use strict';

  const cfg = window.SURVEY_CONFIG || {};
  const STORAGE_KEY = `${cfg.surveyId || 'trade-access-feedback-v2'}:draft`;
  const REVIEW_MODE = new URLSearchParams(window.location.search).get('review') === '1';
  const SIMULATE_MISSING_DETECTION = REVIEW_MODE && new URLSearchParams(window.location.search).get('simulateDetection') === 'missing';

  const TEXT = {
    en: {
      headerNote: 'Thank you for helping us',
      navEyebrow: 'Guided test',
      navTitle: 'Compare two routes',
      navDescription: 'Follow the four stages in order. Your progress is saved on this device.',
      sidebarNote: 'Use the same device, browser, account and network for both routes.',
      stages: [
        ['Prepare', 'About 1 min'],
        ['Route A', 'Test first'],
        ['Route B', 'Test second'],
        ['Compare & send', 'About 2 min']
      ],
      stageComplete: 'Complete',
      stagePending: 'Needs attention',
      missingFields: 'Missing: {fields}',
      routeRatingProgress: '{done} of 4 action ratings completed',
      comparisonPending: 'Required comparison questions are incomplete',
      prerequisiteTitle: 'Complete these earlier stages before submitting',
      prerequisiteIntro: 'Your answers on this page are saved. Choose an unfinished stage below and complete its required items.',
      completeStage: 'Complete stage',
      incompleteFeedback: 'Required items are still missing in: {stages}. Choose the highlighted stage to complete them.',
      stage: 'Stage',
      rated: 'rated steps',
      clear: 'Clear draft',
      saved: 'Draft saved on this device',
      previewWarningTitle: 'Prototype mode',
      previewWarning: 'The form is ready for review, but it will not send data until the release settings are completed.',
      missing: 'Still needed before release:',
      missingLabels: {
        endpoint: 'submission API', orderNumber: 'test order number', contact: 'feedback contact',
        privacyNotice: 'data collection notice', pageExitInstruction: 'page exit / waiting rule', screenshots: 'redacted guide screenshots'
      },
      setupTitle: 'Compare two Linkincrease routes and help us find the faster one',
      setupIntro: 'Complete the same four actions on Route A and Route B. It takes about 5 minutes, and your overall impression is enough.',
      goalLabel: 'Test goal',
      sameActions: 'Same 4 actions',
      chooseFaster: 'Choose the faster route',
      routeA: 'Route A',
      routeB: 'Route B',
      routeHints: ['Test this first', 'Test this second'],
      howTitle: 'Three simple steps',
      how: [
        ['Check your setup', 'Confirm the detected details and add your city.'],
        ['Test A, then B', 'Open each route once and follow the four highlighted actions.'],
        ['Share your feeling', 'Choose which route felt faster and submit your feedback.']
      ],
      infoTitle: 'Your test setup',
      tester: 'Name or tester ID',
      optional: 'Optional',
      testerPlaceholder: 'e.g. SA-01',
      location: 'City / region',
      locationPlaceholder: 'e.g. Johannesburg',
      locationCountry: 'Country / city',
      locationCountryPlaceholder: 'e.g. Johannesburg, South Africa',
      browser: 'Browser',
      device: 'Device',
      network: 'Network connection',
      vpn: 'VPN / proxy',
      country: 'Country',
      timezone: 'Time zone',
      autoTitle: 'Environment details',
      autoHelpComplete: 'These details were detected automatically.',
      autoHelpMissing: 'Some details could not be detected. Please add only the missing items below.',
      notDetected: 'Not detected',
      optionalField: 'Optional — answer only if you know',
      choose: 'Select one',
      browsers: ['Chrome', 'Microsoft Edge', 'Safari', 'Firefox', 'Other'],
      devices: ['Windows computer', 'Mac computer', 'iPhone / iPad', 'Android phone / tablet', 'Other'],
      networks: ['Office Wi-Fi / LAN', 'Home Wi-Fi / LAN', 'Mobile data / hotspot', 'Other'],
      vpns: ['Not used', 'Used', 'Not sure'],
      consistencyTitle: 'Keep the comparison fair',
      consistency: ['Use the same device and browser', 'Use the same account and network', 'Do not change VPN settings', 'Do not clear cache or repeatedly refresh', 'Do not test both routes at the same time'],
      start: 'Start with Route A',
      routeTitle: 'Test {route}',
      routeIntro: 'Open {route} once, complete all four actions in the new tab, then return here to rate them.',
      openRoute: 'Open {route}',
      opensNew: 'Opens in a new tab',
      flowspace: 'Workspace',
      order: 'Test order',
      notConfigured: 'To be confirmed',
      routeSafetyTitle: 'One quick reminder',
      routeSafety: 'Test Route A first, then Route B. Keep the same device and network, and do not open both routes at the same time.',
      guideLabel: 'Screen hint',
      guideCaption: 'The blue outline shows where to click',
      guideCaptionScroll: 'The blue outline shows where to look after scrolling',
      visualLogin: 'Log in',
      visualWorkspace: 'Open workspace',
      visualOrderList: 'Order list',
      visualChooseOrder: 'Choose an order',
      visualSameOrder: 'Search the same order',
      visualWorkOrder: 'Work order',
      visualClick: 'Click',
      visualScroll: 'Scroll',
      actionLabel: 'Do this',
      required: 'Required',
      stepOptional: 'Optional',
      steps: [
        {
          title: 'Log in and open the workspace',
          action: 'Sign in → open “{flowspace}”',
          body: 'Wait until the workspace page is ready before continuing.',
          bullets: ['Keep this route tab open until all four actions are complete.']
        },
        {
          title: 'Open the default order list',
          action: 'Open “Order List” → choose “Default View”',
          body: 'Continue when the order rows are visible.',
          bullets: ['Please do not repeatedly refresh the page.']
        },
        {
          title: 'Open and remember one order',
          titleB: 'Open the same order',
          action: 'Choose any order → remember its order number → open it',
          actionB: 'Search for the same order from Route A → open it',
          body: 'Remember this order; you will open it again on Route B.',
          bodyB: 'Open the exact same order you used on Route A.',
          bullets: ['You may note the order number if that helps.'],
          bulletsB: ['Wait until the main order information is visible.']
        },
        {
          title: 'View the work order section',
          action: 'On the order detail page, scroll down → view “Work orders”',
          body: 'This step is optional. If the section or a work order is not available, choose “Not attempted” below.',
          bullets: ['You do not need to open or operate a work order.']
        }
      ],
      ratingsTitle: 'How did each action feel?',
      ratingsIntro: 'Choose the answer that best matches your experience.',
      ratingNames: ['Smooth', 'Some waiting', 'Noticeably slow, but completed', 'Could not complete', 'Not attempted'],
      continueB: 'Next: Route B',
      continueCompare: 'Compare routes',
      back: 'Back',
      compareTitle: 'Which route felt better?',
      compareIntro: 'Use your overall impression. You do not need to calculate or remember exact seconds.',
      routeSummary: '{route} ratings',
      summaryReviewHint: 'Review only — no action needed',
      notRated: 'Not rated',
      fasterTitle: 'Overall, which route was faster?',
      fasterOptions: ['Route A', 'Route B', 'About the same', 'Not sure'],
      differencesTitle: 'Where did you notice a speed difference?',
      differenceOptions: ['Login / workspace', 'Order list', 'Order detail', 'Work order', 'No clear difference'],
      problemRouteTitle: 'Which route had a problem?',
      problemRouteOptions: ['Route A', 'Route B', 'Both routes', 'Neither route'],
      problemTypeTitle: 'What problem did you encounter?',
      problemTypeOptions: ['Page opened slowly', 'Loading continued for a long time', 'Page did not open', 'Disconnected / error message', 'Other'],
      exploreTitle: 'Optional: other pages you checked',
      exploreHelp: 'After the required actions, did you browse any other page? Select all that apply.',
      exploreOptions: ['Dashboard / home', 'Documents / attachments', 'Search / filter', 'Other page', 'I did not browse other pages'],
      notes: 'Anything else you want us to know?',
      notesPlaceholder: 'Page name, error message, when the issue happened, or any other detail…',
      submit: 'Submit feedback',
      download: 'Download test JSON',
      submitting: 'Submitting…',
      validation: 'Please complete the highlighted questions before continuing.',
      clearConfirm: 'Clear all saved answers and start again?',
      successTitle: 'Thank you — your feedback was submitted',
      successBody: 'Your route comparison has been recorded. You can now close this page.',
      previewSuccessTitle: 'Thank you — you are done',
      previewSuccessBody: 'Your test is complete. You can now close this page.',
      restart: 'Test again',
      downloadAgain: 'Download again',
      submitError: 'We could not confirm that your feedback was saved. Please keep this page open and try again or contact the test coordinator.'
    },
    zh: {
      headerNote: '感谢你帮助我们完成测试',
      navEyebrow: '引导式测试',
      navTitle: '比较两条线路',
      navDescription: '按顺序完成 4 个阶段，进度会保存在当前设备。',
      sidebarNote: '两条线路请使用同一设备、浏览器、账号和网络。',
      stages: [['准备', '约 1 分钟'], ['线路 A', '先测试'], ['线路 B', '后测试'], ['对比并提交', '约 2 分钟']],
      stageComplete: '已完成', stagePending: '待完成', missingFields: '缺少：{fields}',
      routeRatingProgress: '已评价 {done} / 4 个操作', comparisonPending: '本页必填问题尚未完成',
      prerequisiteTitle: '提交前，请先完成以下阶段',
      prerequisiteIntro: '当前页面的答案会自动保存。点击未完成阶段，即可直接返回补充必填内容。',
      completeStage: '去完成', incompleteFeedback: '以下阶段仍有必填内容未完成：{stages}。请点击高亮阶段补充。',
      stage: '阶段', rated: '个步骤已评价', clear: '清除草稿', saved: '草稿已保存在当前设备',
      previewWarningTitle: '当前为评审模式',
      previewWarning: '页面可以完整体验，但发布配置补齐前不会发送数据。',
      missing: '发布前仍需补充：',
      missingLabels: { endpoint: '提交接口', orderNumber: '指定测试订单号', contact: '反馈联系人', privacyNotice: '数据采集说明', pageExitInstruction: '页面离开 / 等待规则', screenshots: '已脱敏的操作截图' },
      setupTitle: '对比两条 Linkincrease 线路，帮我们找出更快的一条',
      setupIntro: '请在线路 A、线路 B 完成相同的 4 个操作，全程约 5 分钟。最后根据整体感受选择更快的线路即可。',
      goalLabel: '本次目标', sameActions: '完成相同 4 个操作', chooseFaster: '选出更快线路',
      routeA: '线路 A', routeB: '线路 B', routeHints: ['先测试这条线路', '再测试这条线路'],
      howTitle: '只需三步',
      how: [['确认测试环境', '确认自动识别的信息，再填写所在城市。'], ['先 A 后 B', '每条线路只打开一次，按突出显示的操作完成测试。'], ['告诉我们感受', '选择哪条线路感觉更快，然后提交反馈。']],
      infoTitle: '你的测试环境', tester: '姓名或测试编号', optional: '选填', testerPlaceholder: '例如：SA-01',
      location: '城市 / 地区', locationPlaceholder: '例如：Johannesburg', locationCountry: '国家 / 城市', locationCountryPlaceholder: '例如：South Africa, Johannesburg', browser: '浏览器', device: '设备', network: '网络连接', vpn: 'VPN / 代理', choose: '请选择',
      country: '国家', timezone: '时区', autoTitle: '测试环境信息', autoHelpComplete: '以下信息已自动识别。', autoHelpMissing: '部分信息未能识别，请仅在下方补充缺失项。', notDetected: '未识别', optionalField: '选填——知道时再选择',
      browsers: ['Chrome', 'Microsoft Edge', 'Safari', 'Firefox', '其他'],
      devices: ['Windows 电脑', 'Mac 电脑', 'iPhone / iPad', 'Android 手机 / 平板', '其他'],
      networks: ['公司 Wi-Fi / 有线网络', '家庭 Wi-Fi / 有线网络', '移动数据 / 热点', '其他'],
      vpns: ['未使用', '已使用', '不确定'],
      consistencyTitle: '保证对比公平',
      consistency: ['使用同一设备和浏览器', '使用同一账号和网络', '不要修改 VPN 设置', '不要清缓存或反复刷新', '不要同时测试两条线路'],
      start: '开始测试线路 A', routeTitle: '测试{route}', routeIntro: '只打开一次{route}，在新标签页连续完成 4 个动作，再返回这里统一评价。',
      openRoute: '打开{route}', opensNew: '将在新标签页打开', flowspace: '工作空间', order: '测试订单', notConfigured: '待确认',
      routeSafetyTitle: '一个小提醒', routeSafety: '请先测试线路 A，再测试线路 B；两次测试保持同一设备和网络，并且不要同时打开两条线路。',
      guideLabel: '页面位置示意', guideCaption: '蓝色线框表示需要点击的位置', guideCaptionScroll: '向下滚动后，蓝色线框表示需要查看的位置', visualLogin: '登录', visualWorkspace: '进入工作空间', visualOrderList: '订单列表', visualChooseOrder: '任选一个订单', visualSameOrder: '搜索同一订单', visualWorkOrder: '工作单', visualClick: '点击', visualScroll: '向下滚动', actionLabel: '请完成', required: '必做', stepOptional: '选做',
      steps: [
        { title: '登录并进入工作空间', action: '登录 → 打开“{flowspace}”', body: '等待工作空间页面显示完成后再继续。', bullets: ['完成 4 个操作前，请保持当前线路页面打开。'] },
        { title: '打开默认订单列表', action: '进入订单列表 → 点击默认视图', body: '看到订单列表后继续下一步。', bullets: ['请不要反复刷新页面。'] },
        { title: '打开并记住一个订单', titleB: '打开与线路 A 相同的订单', action: '任选一个订单 → 记住订单编号 → 打开详情', actionB: '搜索线路 A 的同一订单 → 打开详情', body: '请记住这个订单，线路 B 还需要再次打开。', bodyB: '请打开在线路 A 中使用的同一个订单。', bullets: ['如有需要，可以记一下订单号。'], bulletsB: ['等待订单主要信息显示完成。'] },
        { title: '查看工作单区域', action: '在订单详情页向下滚动 → 查看“Work orders”区域', body: '这一步为选做；如果没有该区域或没有工作单，请在下方选择“未尝试”。', bullets: ['无需打开或操作工作单。'] }
      ],
      ratingsTitle: '这 4 个操作感觉如何？', ratingsIntro: '选择最接近本次体验的答案即可。',
      ratingNames: ['流畅', '稍有等待', '明显较慢但已完成', '无法完成', '未尝试'],
      continueB: '下一步：线路 B', continueCompare: '对比两条线路', back: '返回',
      compareTitle: '哪条线路体验更好？', compareIntro: '根据整体感受回答即可，不需要计算或回忆具体秒数。',
      routeSummary: '{route}评价', summaryReviewHint: '以下仅为已填写结果，无需再次选择', notRated: '未评价', fasterTitle: '整体来看，哪条线路更快？', fasterOptions: ['线路 A', '线路 B', '差不多', '不确定'],
      differencesTitle: '哪些页面的速度有明显差异？', differenceOptions: ['登录 / 工作空间', '订单列表', '订单详情', '工作单', '没有明显差异'],
      problemRouteTitle: '哪条线路遇到了问题？', problemRouteOptions: ['线路 A', '线路 B', '两条线路都有', '两条线路都没有'],
      problemTypeTitle: '遇到了什么问题？', problemTypeOptions: ['页面打开较慢', '长时间加载中', '页面无法打开', '断开连接 / 错误提示', '其他'],
      exploreTitle: '选填：还查看了哪些页面', exploreHelp: '完成必做动作后，你是否浏览了其他页面？可多选。',
      exploreOptions: ['仪表盘 / 首页', '文档 / 附件', '搜索 / 筛选', '其他页面', '没有浏览其他页面'],
      notes: '还有什么想告诉我们？', notesPlaceholder: '页面名称、错误提示、问题发生时间或其他信息……',
      submit: '提交反馈', download: '下载测试 JSON', submitting: '正在提交……',
      validation: '请先完成标记的问题再继续。', clearConfirm: '确定清除所有已保存答案并重新开始吗？',
      successTitle: '感谢反馈，提交成功', successBody: '你的线路对比结果已记录，现在可以关闭此页面。',
      previewSuccessTitle: '感谢帮助，测试完成', previewSuccessBody: '你已经完成本次测试，现在可以关闭这个页面。',
      restart: '重新测试', downloadAgain: '再次下载',
      submitError: '暂时无法确认反馈是否保存成功。请保留当前页面，稍后重试或联系测试负责人。'
    }
  };

  const defaultState = () => {
    const detected = detectEnvironment();
    return {
      language: cfg.defaultLanguage === 'zh' ? 'zh' : 'en',
      page: 0,
      maxPage: 0,
      profile: {
        tester: '', location: '', country: detected.country, browser: detected.browser,
        device: detected.device, timezone: detected.timezone, network: detected.network, vpn: ''
      },
      routes: {
        A: { opened: false, ratings: ['', '', '', ''] },
        B: { opened: false, ratings: ['', '', '', ''] }
      },
      comparison: { faster: '', differences: [], problemRoute: '', problemTypes: [], explored: [], notes: '' },
      completed: false,
      previewComplete: false,
      submissionId: createId(),
      updatedAt: ''
    };
  };

  let state = loadState();
  let isSubmitting = false;

  const el = {
    content: document.querySelector('#content'), navigation: document.querySelector('#navigation'),
    sectionLabel: document.querySelector('#section-label'), progressLabel: document.querySelector('#progress-label'),
    progressFill: document.querySelector('#progress-fill'), progressTrack: document.querySelector('.progress-track'),
    language: document.querySelector('#language'), clear: document.querySelector('#clear'),
    feedback: document.querySelector('#feedback'), actions: document.querySelector('#actions'),
    setupWarning: document.querySelector('#setup-warning'), draftStatus: document.querySelector('#draft-status')
  };

  function createId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `li-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function detectEnvironment() {
    const ua = navigator.userAgent || '';
    if (SIMULATE_MISSING_DETECTION) {
      return { browser: 'unknown', device: 'unknown', timezone: '—', country: '', network: '' };
    }
    let browser = 'unknown';
    if (/Edg\//.test(ua)) browser = 'edge';
    else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browser = 'chrome';
    else if (/Firefox\//.test(ua)) browser = 'firefox';
    else if (/Safari\//.test(ua) && /Version\//.test(ua)) browser = 'safari';

    let device = 'unknown';
    if (/Windows/i.test(ua)) device = 'windows';
    else if (/iPhone|iPad|iPod/i.test(ua)) device = 'ios';
    else if (/Android/i.test(ua)) device = 'android';
    else if (/Macintosh|Mac OS X/i.test(ua)) device = 'mac';

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '—';
    const countryByTimezone = {
      'Africa/Johannesburg': 'South Africa',
      'Asia/Shanghai': 'China',
      'Asia/Chongqing': 'China',
      'Europe/London': 'United Kingdom',
      'America/New_York': 'United States',
      'America/Chicago': 'United States',
      'America/Denver': 'United States',
      'America/Los_Angeles': 'United States'
    };
    const country = countryByTimezone[timezone] || '';
    const connectionType = navigator.connection?.type || '';
    const network = connectionType === 'cellular' ? 'mobile' : '';
    return { browser, device, timezone, country, network };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!parsed || typeof parsed !== 'object') return defaultState();
      const base = defaultState();
      const merged = {
        ...base, ...parsed,
        profile: { ...base.profile, ...(parsed.profile || {}) },
        routes: {
          A: { ...base.routes.A, ...(parsed.routes?.A || {}), ratings: normalizeArray(parsed.routes?.A?.ratings, 4) },
          B: { ...base.routes.B, ...(parsed.routes?.B || {}), ratings: normalizeArray(parsed.routes?.B?.ratings, 4) }
        },
        comparison: { ...base.comparison, ...(parsed.comparison || {}) }
      };
      const detected = detectEnvironment();
      if (SIMULATE_MISSING_DETECTION) {
        merged.profile.browser = 'unknown';
        merged.profile.device = 'unknown';
        merged.profile.country = '';
        merged.profile.timezone = '—';
        return merged;
      }
      if (detected.browser !== 'unknown' || !merged.profile.browser) merged.profile.browser = detected.browser;
      if (detected.device !== 'unknown' || !merged.profile.device) merged.profile.device = detected.device;
      merged.profile.timezone = detected.timezone;
      merged.profile.country = detected.country;
      if (!merged.profile.network && detected.network) merged.profile.network = detected.network;
      return merged;
    } catch (_) {
      return defaultState();
    }
  }

  function normalizeArray(value, length) {
    const arr = Array.isArray(value) ? value.slice(0, length) : [];
    while (arr.length < length) arr.push('');
    return arr;
  }

  function saveState() {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    el.draftStatus.textContent = t('saved');
  }

  function t(key) { return TEXT[state.language][key]; }
  function esc(value) { return String(value ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c])); }
  function interpolate(value, vars) { return Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, v), value); }
  function routeName(route) { return state.language === 'zh' ? `线路 ${route}` : `Route ${route}`; }

  function getMissingConfig() {
    const missing = [];
    if (!cfg.endpoint) missing.push('endpoint');
    if (!cfg.contact) missing.push('contact');
    if (!cfg.privacyNotice?.[state.language]) missing.push('privacyNotice');
    if (!cfg.pageExitInstruction?.[state.language]) missing.push('pageExitInstruction');
    if (!cfg.screenshots || Object.values(cfg.screenshots).every(v => !v)) missing.push('screenshots');
    return missing;
  }

  function countRatings() {
    return [...state.routes.A.ratings, ...state.routes.B.ratings].filter(Boolean).length;
  }

  function renderChrome() {
    document.documentElement.lang = state.language;
    document.title = state.language === 'zh' ? 'Linkincrease · 访问线路测试' : 'Linkincrease · Access route test';
    document.querySelector('.skip-link').textContent = state.language === 'zh' ? '跳到测试内容' : 'Skip to the test guide';
    document.querySelector('#header-note').textContent = t('headerNote');
    document.querySelector('#nav-eyebrow').textContent = t('navEyebrow');
    document.querySelector('#nav-title').textContent = t('navTitle');
    document.querySelector('#nav-description').textContent = t('navDescription');
    document.querySelector('#sidebar-note').textContent = t('sidebarNote');
    document.querySelector('.page-footer').hidden = !REVIEW_MODE;
    el.language.textContent = state.language === 'en' ? '中文' : 'English';
    el.clear.textContent = t('clear');
    el.sectionLabel.textContent = `${t('stage')} ${state.page + 1} / 4 · ${t('stages')[state.page][0]}`;
    el.progressLabel.textContent = `${countRatings()} / 8 ${t('rated')}`;
    const percent = (countRatings() / 8) * 100;
    el.progressFill.style.width = `${percent}%`;
    el.progressTrack.setAttribute('aria-valuenow', String(countRatings()));
    renderNavigation();
    renderSetupWarning();
  }

  function renderNavigation() {
    el.navigation.innerHTML = t('stages').map((item, index) => {
      const complete = isStageComplete(index);
      const needsAttention = state.page === 3 && index < 3 && !complete;
      return `<button class="nav-item${state.page === index ? ' active' : ''}${complete ? ' complete' : ''}${needsAttention ? ' needs-attention' : ''}" type="button" data-nav="${index}" ${state.completed ? 'disabled' : ''} aria-current="${state.page === index ? 'step' : 'false'}">
        <span class="nav-index">${complete ? '✓' : index + 1}</span>
        <span class="nav-copy"><strong>${esc(item[0])}</strong><small>${esc(item[1])}</small></span>
        <span class="nav-trailing"><span class="nav-status">${esc(complete ? t('stageComplete') : t('stagePending'))}</span><span class="nav-arrow" aria-hidden="true">›</span></span>
      </button>`;
    }).join('');
    el.navigation.querySelectorAll('[data-nav]').forEach(button => button.addEventListener('click', () => {
      state.page = Number(button.dataset.nav);
      state.maxPage = Math.max(state.maxPage, state.page);
      saveState();
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector('#main').focus({ preventScroll: true });
    }));
  }

  function isStageComplete(index) {
    if (index === 0) return validateProfile(false);
    if (index === 1) return state.routes.A.ratings.every(Boolean);
    if (index === 2) return state.routes.B.ratings.every(Boolean);
    return validateCompare() || state.completed || state.previewComplete;
  }

  function getStageDetail(index) {
    if (index === 0) {
      const missing = [];
      if (!String(state.profile.location || '').trim()) missing.push(state.profile.country ? t('location') : t('locationCountry'));
      if (state.profile.browser === 'unknown') missing.push(t('browser'));
      if (state.profile.device === 'unknown') missing.push(t('device'));
      return missing.length ? interpolate(t('missingFields'), { fields: missing.join(state.language === 'zh' ? '、' : ', ') }) : t('stageComplete');
    }
    if (index === 1 || index === 2) {
      const route = index === 1 ? 'A' : 'B';
      const done = state.routes[route].ratings.filter(Boolean).length;
      return done === 4 ? t('stageComplete') : interpolate(t('routeRatingProgress'), { done });
    }
    return validateCompare() ? t('stageComplete') : t('comparisonPending');
  }

  function getIncompleteStages() {
    return t('stages').map((item, index) => ({
      index,
      title: item[0],
      detail: getStageDetail(index),
      complete: isStageComplete(index)
    })).filter(item => !item.complete);
  }

  function renderPrerequisiteNotice() {
    const missing = getIncompleteStages().filter(item => item.index < 3);
    if (!missing.length) return '';
    return `<section class="prerequisite-notice" aria-labelledby="prerequisite-title">
      <div class="prerequisite-heading"><span aria-hidden="true">!</span><div><h2 id="prerequisite-title">${esc(t('prerequisiteTitle'))}</h2><p>${esc(t('prerequisiteIntro'))}</p></div></div>
      <div class="prerequisite-list">${missing.map(item => `<button type="button" class="prerequisite-item" data-go-stage="${item.index}"><span class="prerequisite-index">${item.index + 1}</span><span class="prerequisite-copy"><strong>${esc(item.title)}</strong><small>${esc(item.detail)}</small></span><span class="prerequisite-action">${esc(t('completeStage'))} →</span></button>`).join('')}</div>
    </section>`;
  }

  function renderSetupWarning() {
    if (!REVIEW_MODE) {
      el.setupWarning.hidden = true;
      return;
    }
    const missing = getMissingConfig();
    if (!missing.length || state.completed) {
      el.setupWarning.hidden = true;
      return;
    }
    el.setupWarning.hidden = false;
    el.setupWarning.innerHTML = `<strong>${esc(t('previewWarningTitle'))}</strong><p>${esc(t('previewWarning'))}</p><p><strong>${esc(t('missing'))}</strong> ${missing.map(k => esc(t('missingLabels')[k])).join('、')}</p>`;
  }

  function render() {
    clearFeedback();
    renderChrome();
    if (state.completed || state.previewComplete) return renderSuccess();
    if (state.page === 0) renderPrepare();
    if (state.page === 1) renderRoute('A');
    if (state.page === 2) renderRoute('B');
    if (state.page === 3) renderCompare();
    bindCommonFields();
  }

  function renderPrepare() {
    const p = state.profile;
    const missingCountry = !p.country;
    const missingBrowser = p.browser === 'unknown';
    const missingDevice = p.device === 'unknown';
    const hasMissingEnvironment = missingCountry || missingBrowser || missingDevice;
    const locationLabel = missingCountry ? t('locationCountry') : t('location');
    const locationPlaceholder = missingCountry ? t('locationCountryPlaceholder') : t('locationPlaceholder');
    el.content.innerHTML = `
      <section class="hero-panel">
        <div class="hero-copy">
          <p class="overline">${esc(t('goalLabel'))}</p>
          <h2>${esc(t('setupTitle'))}</h2>
          <p>${esc(t('setupIntro'))}</p>
        </div>
        <div class="route-compare">
          <div class="route-pair">
            <div class="route-chip"><span class="route-sequence">1</span><span><strong>${esc(t('routeA'))}</strong><small>${esc(t('routeHints')[0])}</small></span></div>
            <span class="route-vs" aria-hidden="true">VS</span>
            <div class="route-chip"><span class="route-sequence">2</span><span><strong>${esc(t('routeB'))}</strong><small>${esc(t('routeHints')[1])}</small></span></div>
          </div>
          <div class="compare-outcome"><span>${esc(t('sameActions'))}</span><b aria-hidden="true">→</b><strong>${esc(t('chooseFaster'))}</strong></div>
        </div>
      </section>
      <h2 class="section-title">${esc(t('howTitle'))}</h2>
      <div class="how-grid">${t('how').map((item, i) => `<article class="how-card"><span class="how-number">${i + 1}</span><h3>${esc(item[0])}</h3><p>${esc(item[1])}</p></article>`).join('')}</div>
      <h2 class="section-title">${esc(t('infoTitle'))}</h2>
      <section class="detected-panel"><div class="detected-heading"><span class="detected-icon${hasMissingEnvironment ? ' is-warning' : ''}">${hasMissingEnvironment ? '!' : '✓'}</span><div><h3>${esc(t('autoTitle'))}</h3><p>${esc(hasMissingEnvironment ? t('autoHelpMissing') : t('autoHelpComplete'))}</p></div></div><div class="detected-grid">
        ${detectedItem(t('country'), p.country || t('notDetected'), missingCountry)}
        ${detectedItem(t('browser'), environmentLabel('browser', p.browser), missingBrowser)}
        ${detectedItem(t('device'), environmentLabel('device', p.device), missingDevice)}
        ${p.timezone && p.timezone !== '—' ? detectedItem(t('timezone'), p.timezone) : ''}
      </div></section>
      <div class="form-grid setup-fields">
        ${textField('location', locationLabel, p.location, locationPlaceholder, true)}
        ${missingBrowser ? selectField('browser', t('browser'), t('browsers'), p.browser, ['chrome', 'edge', 'safari', 'firefox', 'other'], true) : ''}
        ${missingDevice ? selectField('device', t('device'), t('devices'), p.device, ['windows', 'mac', 'ios', 'android', 'other'], true) : ''}
        ${selectField('network', t('network'), t('networks'), p.network, ['office', 'home', 'mobile', 'other'], false)}
        ${selectField('vpn', t('vpn'), t('vpns'), p.vpn, ['no', 'yes', 'unsure'], false)}
      </div>
      <div class="notice notice-info" style="margin-top:18px"><strong>${esc(t('consistencyTitle'))}</strong><ul class="consistency-list">${t('consistency').map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>`;
    el.actions.innerHTML = `<button class="primary-button" type="button" data-next>${esc(t('start'))}</button>`;
    el.actions.querySelector('[data-next]').addEventListener('click', () => {
      if (!validateProfile(true)) return;
      goTo(1);
    });
  }

  function textField(name, label, value, placeholder, required) {
    return `<label class="field form-card"><span>${esc(label)}${required ? ' <b class="required">*</b>' : ''}</span><input type="text" name="${name}" value="${esc(value)}" placeholder="${esc(placeholder)}" ${required ? 'required' : ''}></label>`;
  }

  function selectField(name, label, options, value, values = options, required = true) {
    return `<label class="field form-card"><span>${esc(label)}${required ? ' <b class="required">*</b>' : ` <small>· ${esc(t('optionalField'))}</small>`}</span><select name="${name}" ${required ? 'required' : ''}><option value="">${esc(t('choose'))}</option>${options.map((opt, index) => `<option value="${esc(values[index])}" ${values[index] === value ? 'selected' : ''}>${esc(opt)}</option>`).join('')}</select></label>`;
  }

  function detectedItem(label, value, missing = false) {
    return `<div class="detected-item${missing ? ' is-missing' : ''}"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`;
  }

  function environmentLabel(type, code) {
    const codes = type === 'browser'
      ? ['chrome', 'edge', 'safari', 'firefox', 'other']
      : ['windows', 'mac', 'ios', 'android', 'other'];
    const labels = type === 'browser' ? t('browsers') : t('devices');
    if (code === 'unknown') return t('notDetected');
    const index = codes.indexOf(code);
    return index >= 0 ? labels[index] : labels[labels.length - 1];
  }

  function bindCommonFields() {
    el.content.querySelectorAll('input[name], select[name], textarea[name]').forEach(input => {
      input.addEventListener('change', handleFieldChange);
      if (input.tagName === 'INPUT' && input.type === 'text' || input.tagName === 'TEXTAREA') input.addEventListener('input', handleFieldChange);
    });
  }

  function handleFieldChange(event) {
    const input = event.target;
    const name = input.name;
    if (Object.hasOwn(state.profile, name)) {
      state.profile[name] = input.value.trimStart();
      if (name === 'browser' || name === 'device') {
        saveState();
        render();
        return;
      }
    } else if (name === 'notes') {
      state.comparison.notes = input.value;
    } else if (name === 'faster' || name === 'problemRoute') {
      state.comparison[name] = input.value;
      if (name === 'problemRoute' && input.value === 'none') state.comparison.problemTypes = [];
      if (name === 'problemRoute') {
        saveState();
        render();
        return;
      }
    } else if (['differences', 'problemTypes', 'explored'].includes(name)) {
      const values = [...el.content.querySelectorAll(`input[name="${name}"]:checked`)].map(node => node.value);
      state.comparison[name] = enforceExclusive(name, values, input.value);
      saveState();
      render();
      return;
    }
    saveState();
  }

  function enforceExclusive(name, values, changed) {
    const exclusive = ['differences', 'explored'].includes(name) ? 'none' : '';
    if (!exclusive) return values;
    if (changed === exclusive && values.includes(exclusive)) return [exclusive];
    return values.filter(v => v !== exclusive);
  }

  function validateProfile(showError) {
    const valid = Boolean(
      String(state.profile.location || '').trim() &&
      state.profile.browser !== 'unknown' &&
      state.profile.device !== 'unknown'
    );
    if (!valid && showError) showFeedback(t('validation'));
    return valid;
  }

  function renderRoute(route) {
    const routeState = state.routes[route];
    const url = cfg.routes?.[route] || '#';
    const steps = t('steps');
    el.content.innerHTML = `
      <div class="route-header">
        <div class="page-heading"><p class="overline">${esc(routeName(route))}</p><h1>${esc(interpolate(t('routeTitle'), { route: routeName(route) }))}</h1><p>${esc(interpolate(t('routeIntro'), { route: routeName(route) }))}</p></div>
        <a class="route-open" href="${esc(url)}" target="_blank" rel="noopener noreferrer" data-open-route>${esc(interpolate(t('openRoute'), { route: routeName(route) }))} ↗</a>
      </div>
      <div class="notice notice-info"><strong>${esc(t('routeSafetyTitle'))}</strong><p>${esc(t('routeSafety'))}</p></div>
      <div class="guide-list">${steps.map((step, index) => renderGuideStep(step, index, route)).join('')}</div>
      <section class="ratings-panel">
        <div class="ratings-head"><div><h2>${esc(t('ratingsTitle'))}</h2><p>${esc(t('ratingsIntro'))}</p></div></div>
        ${steps.map((step, index) => renderRatingRow(route, stepTitle(step, route), index, routeState.ratings[index])).join('')}
      </section>`;
    el.actions.innerHTML = `
      <button class="ghost-button back" type="button" data-back>${esc(t('back'))}</button>
      <button class="primary-button" type="button" data-next>${esc(route === 'A' ? t('continueB') : t('continueCompare'))}</button>`;
    el.content.querySelector('[data-open-route]').addEventListener('click', () => { state.routes[route].opened = true; saveState(); });
    el.content.querySelectorAll(`input[name^="rating-${route}"]`).forEach(input => input.addEventListener('change', () => {
      state.routes[route].ratings[Number(input.dataset.step)] = input.value;
      saveState();
      renderChrome();
    }));
    el.actions.querySelector('[data-back]').addEventListener('click', () => goTo(route === 'A' ? 0 : 1));
    el.actions.querySelector('[data-next]').addEventListener('click', () => {
      if (!state.routes[route].ratings.every(Boolean)) return showFeedback(t('validation'));
      goTo(route === 'A' ? 2 : 3);
    });
  }

  function stepTitle(step, route) {
    return route === 'B' && step.titleB ? step.titleB : step.title;
  }

  function renderGuideStep(step, index, route) {
    const bodyTemplate = route === 'B' && step.bodyB ? step.bodyB : step.body;
    const actionTemplate = route === 'B' && step.actionB ? step.actionB : step.action;
    const bullets = route === 'B' && step.bulletsB ? step.bulletsB : step.bullets;
    const body = interpolate(bodyTemplate, { flowspace: cfg.flowSpace || 'TFG S&E Audit' });
    const action = interpolate(actionTemplate, { flowspace: cfg.flowSpace || 'TFG S&E Audit' });
    return `<article class="guide-step${index === 3 ? ' optional' : ''}" data-step="${index + 1}">
      <span class="step-number">${index + 1}</span>
      <div class="step-copy"><h3>${esc(stepTitle(step, route))} <span class="tag">${esc(index === 3 ? t('stepOptional') : t('required'))}</span></h3><div class="step-action"><span>${esc(t('actionLabel'))}</span><strong>${esc(action)}</strong></div><p>${esc(body)}</p><ul>${bullets.map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>
      ${renderVisual(index, route)}
    </article>`;
  }

  function renderVisual(index, route) {
    const imageKeys = ['login', 'orders', 'detail', 'workOrder'];
    const image = cfg.screenshots?.[imageKeys[index]];
    if (image) return `<div class="visual-wrap"><div class="guide-visual guide-visual-image"><img src="${esc(image)}" alt="${esc(t('guideLabel'))}"></div><div class="visual-caption">${esc(t('guideCaption'))}</div></div>`;

    const marker = number => `<span class="click-marker" aria-hidden="true">${number}</span>`;
    const flowSpace = cfg.flowSpace || 'TFG S&E Audit';
    const appRail = `<div class="shot-app-rail"><b>TFG</b><i></i><i></i><i></i></div>`;
    const orderNav = highlight => `<div class="shot-order-nav"><strong>Dashboard</strong><span>Monthly Feedback</span><span>Realtime Feedback</span><strong>Order List</strong><span class="is-selected${highlight ? ' target-box' : ''}">Default View${highlight ? marker(1) : ''}</span><span>China Factory list</span><span>Continue to use</span></div>`;
    let visual = '';

    if (index === 0) {
      visual = `<div class="visual-scene visual-login-scene">
        <div class="shot-card shot-login">
          <div class="shot-login-art"><i></i><i></i><i></i></div>
          <div class="shot-login-form"><div class="mini-brand"><span></span>Linkincrease</div><b>Password Login</b><small>Email</small><div class="mini-input"></div><small>Password</small><div class="mini-input"></div><div class="mini-button target-box">${esc(t('visualLogin'))}${marker(1)}</div></div>
        </div>
        <span class="scene-arrow" aria-hidden="true">→</span>
        <div class="shot-card shot-workspace">
          <div class="shot-workspace-top"><b>Workspace</b><span></span><span></span></div>
          <div class="shot-workspace-body"><div class="shot-calendar"></div><div class="shot-summary"><i></i><i></i></div><div class="shot-fs-area"><small>FlowSpace</small><div class="workspace-card target-box"><b>${esc(flowSpace)}</b><span>Orders</span>${marker(2)}</div></div></div>
        </div>
      </div>`;
    } else if (index === 1) {
      visual = `<div class="visual-scene visual-orders-scene">
        ${appRail}
        ${orderNav(true)}
        <div class="shot-table-panel"><div class="shot-table-tools"><span></span><span></span><span></span></div><div class="shot-table-head"><b>Order Code</b><b>Order ID</b><b>Status</b></div><div class="shot-table-row"><span></span><span></span><i></i></div><div class="shot-table-row"><span></span><span></span><i></i></div><div class="shot-table-row"><span></span><span></span><i></i></div><div class="shot-table-row"><span></span><span></span><i></i></div></div>
      </div>`;
    } else if (index === 2) {
      visual = `<div class="visual-scene visual-search-scene">
        ${appRail}${orderNav(false)}
        <div class="shot-search-main"><div class="shot-search-tools"><div class="mini-search${route === 'B' ? ' target-box' : ''}"><span aria-hidden="true">⌕</span>${esc(route === 'B' ? t('visualSameOrder') : 'Search')}${route === 'B' ? marker(1) : ''}</div><b>Export</b><b>Filter</b></div><div class="shot-table-head"><b>Order Code</b><b>Order ID</b><b>Status</b></div><div class="mini-result target-box"><span class="row-check"></span><b>${esc(route === 'B' ? 'Same order' : t('visualChooseOrder'))}</b><span class="row-status">In Progress</span>${marker(route === 'B' ? 2 : 1)}</div><div class="mini-row-faint"></div></div>
      </div>`;
    } else {
      visual = `<div class="visual-scene visual-workorder-scene">
        ${appRail}
        <div class="shot-detail-nav"><b>Order detail</b><span class="is-selected">Overview</span><span>Milestones</span><span>Documents</span><span>Activity</span></div>
        <div class="shot-detail-main"><div class="shot-detail-title"><b>Order</b><span>In Progress</span></div><div class="detail-tabs"><span class="active">Overview</span><span>Timeline</span><span>Files</span></div><div class="detail-summary"><i></i><i></i><i></i></div><div class="scroll-cue" aria-hidden="true">↓</div><div class="workorder-section target-box"><small>Work orders</small><div class="workorder-card"><span class="workorder-icon">✓</span><b>${esc(t('visualWorkOrder'))}</b><span>${state.language === 'zh' ? '可见' : 'Visible'}</span></div></div></div>
      </div>`;
    }

    const visualInstruction = index === 3 ? t('guideCaptionScroll') : t('guideCaption');
    return `<div class="visual-wrap"><div class="guide-visual" role="img" aria-label="${esc(visualInstruction)}"><div class="visual-browser-bar"><span></span><span></span><span></span><b>${esc(index === 3 ? t('visualScroll') : t('visualClick'))}</b></div>${visual}</div><div class="visual-caption">${esc(visualInstruction)}</div></div>`;
  }

  function renderRatingRow(route, title, index, value) {
    return `<div class="rating-row"><div class="rating-title"><strong>${index + 1}. ${esc(title)}</strong><small>${index === 3 ? esc(t('stepOptional')) : esc(t('required'))}</small></div><div class="rating-options">${t('ratingNames').map((label, i) => {
      const score = String(i + 1);
      return `<span class="choice"><input type="radio" id="rating-${route}-${index}-${score}" name="rating-${route}-${index}" data-step="${index}" value="${score}" ${value === score ? 'checked' : ''}><label for="rating-${route}-${index}-${score}">${esc(label)}</label></span>`;
    }).join('')}</div></div>`;
  }

  function renderCompare() {
    const c = state.comparison;
    const hasProblem = c.problemRoute && c.problemRoute !== 'none';
    el.content.innerHTML = `
      <div class="page-heading"><p class="overline">${esc(t('stages')[3][0])}</p><h1>${esc(t('compareTitle'))}</h1><p>${esc(t('compareIntro'))}</p></div>
      ${renderPrerequisiteNotice()}
      <div class="summary-grid">
        ${renderSummary('A')}${renderSummary('B')}
      </div>
      <div class="comparison-grid" style="margin-top:18px">
        ${radioQuestion('faster', t('fasterTitle'), t('fasterOptions'), c.faster, ['A', 'B', 'same', 'unsure'])}
        ${checkboxQuestion('differences', t('differencesTitle'), t('differenceOptions'), c.differences, ['login', 'orders', 'detail', 'workOrder', 'none'])}
        ${radioQuestion('problemRoute', t('problemRouteTitle'), t('problemRouteOptions'), c.problemRoute, ['A', 'B', 'both', 'none'])}
        ${hasProblem ? checkboxQuestion('problemTypes', t('problemTypeTitle'), t('problemTypeOptions'), c.problemTypes, ['slow', 'loading', 'noOpen', 'disconnect', 'other']) : `<article class="question-card"><h3>${esc(t('problemTypeTitle'))}</h3><p>${state.language === 'zh' ? '选择遇到问题的线路后显示。' : 'Shown after you select a route with a problem.'}</p></article>`}
      </div>
      <details class="collapsible" ${c.explored.length ? 'open' : ''}><summary>${esc(t('exploreTitle'))}</summary><div class="collapsible-body"><p>${esc(t('exploreHelp'))}</p>${checkboxOptions('explored', t('exploreOptions'), c.explored, ['home', 'documents', 'search', 'other', 'none'])}</div></details>
      <label class="field" style="margin-top:18px"><span>${esc(t('notes'))} · ${esc(t('optional'))}</span><textarea name="notes" placeholder="${esc(t('notesPlaceholder'))}">${esc(c.notes)}</textarea></label>
      ${cfg.privacyNotice?.[state.language] ? `<div class="notice notice-info" style="margin-top:18px"><strong>${state.language === 'zh' ? '数据使用说明' : 'How your feedback is used'}</strong><p>${esc(cfg.privacyNotice[state.language])}</p>${cfg.contact ? `<p>${state.language === 'zh' ? '联系' : 'Contact'}: ${esc(cfg.contact)}</p>` : ''}</div>` : ''}`;
    el.actions.innerHTML = `<button class="ghost-button back" type="button" data-back>${esc(t('back'))}</button><button class="primary-button" type="button" data-submit>${esc(t('submit'))}</button>`;
    el.actions.querySelector('[data-back]').addEventListener('click', () => goTo(2));
    el.actions.querySelector('[data-submit]').addEventListener('click', submit);
    el.content.querySelectorAll('[data-go-stage]').forEach(button => button.addEventListener('click', () => goTo(Number(button.dataset.goStage))));
  }

  function renderSummary(route) {
    const values = state.routes[route].ratings;
    const steps = t('steps');
    return `<article class="summary-card"><h3>${esc(interpolate(t('routeSummary'), { route: routeName(route) }))}</h3><p>${esc(cfg.routes?.[route] || '')}</p><p class="summary-readonly">${esc(t('summaryReviewHint'))}</p><div class="summary-score">${values.map((value, index) => `<div class="summary-rating"><span class="summary-rating-index">${index + 1}</span><span>${esc(stepTitle(steps[index], route))}</span><strong>${value ? esc(t('ratingNames')[Number(value) - 1]) : esc(t('notRated'))}</strong></div>`).join('')}</div></article>`;
  }

  function radioQuestion(name, title, options, selected, values = options) {
    return `<fieldset class="question-card"><legend>${esc(title)} <b class="required">*</b></legend><div class="option-grid">${options.map((label, index) => `<span class="option-card"><input type="radio" id="${name}-${slug(values[index])}" name="${name}" value="${esc(values[index])}" ${selected === values[index] ? 'checked' : ''}><label for="${name}-${slug(values[index])}">${esc(label)}</label></span>`).join('')}</div></fieldset>`;
  }

  function checkboxQuestion(name, title, options, selected, values = options) {
    return `<fieldset class="question-card"><legend>${esc(title)} <b class="required">*</b></legend>${checkboxOptions(name, options, selected, values)}</fieldset>`;
  }

  function checkboxOptions(name, options, selected, values = options) {
    return `<div class="option-grid">${options.map((label, index) => `<span class="option-card checkbox"><input type="checkbox" id="${name}-${slug(values[index])}" name="${name}" value="${esc(values[index])}" ${selected.includes(values[index]) ? 'checked' : ''}><label for="${name}-${slug(values[index])}">${esc(label)}</label></span>`).join('')}</div>`;
  }

  function slug(value) { return encodeURIComponent(value).replaceAll('%', '').toLowerCase(); }

  function validateCompare() {
    const c = state.comparison;
    const hasProblem = c.problemRoute && c.problemRoute !== 'none';
    return Boolean(c.faster && c.differences.length && c.problemRoute && (!hasProblem || c.problemTypes.length));
  }

  async function submit() {
    if (isSubmitting) return;
    const incomplete = getIncompleteStages();
    if (incomplete.length) {
      renderNavigation();
      showFeedback(interpolate(t('incompleteFeedback'), { stages: incomplete.map(item => item.title).join(state.language === 'zh' ? '、' : ', ') }));
      const prerequisite = el.content.querySelector('.prerequisite-notice');
      if (prerequisite) prerequisite.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const payload = buildPayload();
    if (!cfg.endpoint) {
      if (REVIEW_MODE) downloadPayload(payload);
      state.previewComplete = true;
      saveState();
      render();
      return;
    }
    isSubmitting = true;
    const button = el.actions.querySelector('[data-submit]');
    button.disabled = true;
    button.textContent = t('submitting');
    try {
      const response = await fetch(cfg.endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        credentials: 'omit', body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.code !== 0 || result?.data?.submissionId !== state.submissionId) throw new Error('Unconfirmed response');
      state.completed = true;
      saveState();
      render();
    } catch (_) {
      showFeedback(t('submitError'));
      button.disabled = false;
      button.textContent = t('submit');
    } finally {
      isSubmitting = false;
    }
  }

  function buildPayload() {
    return {
      surveyId: cfg.surveyId || 'trade-access-feedback-v2',
      submissionId: state.submissionId,
      submittedAtClient: new Date().toISOString(),
      language: state.language,
      profile: { ...state.profile },
      testContext: {
        flowSpace: cfg.flowSpace || 'TFG S&E Audit', orderNumber: cfg.orderNumber || '',
        routes: { A: cfg.routes?.A || '', B: cfg.routes?.B || '' }
      },
      routeResults: {
        A: { opened: state.routes.A.opened, ratings: [...state.routes.A.ratings] },
        B: { opened: state.routes.B.opened, ratings: [...state.routes.B.ratings] }
      },
      comparison: { ...state.comparison }
    };
  }

  function downloadPayload(payload) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `linkincrease-route-test-${state.submissionId}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }

  function renderSuccess() {
    const preview = state.previewComplete && !state.completed;
    el.setupWarning.hidden = true;
    el.content.innerHTML = `<section class="success-view"><span class="success-icon">✓</span><h1>${esc(preview ? t('previewSuccessTitle') : t('successTitle'))}</h1><p>${esc(preview ? t('previewSuccessBody') : t('successBody'))}</p><div class="success-actions">${REVIEW_MODE && preview ? `<button class="secondary-button" type="button" data-download>${esc(t('downloadAgain'))}</button>` : ''}<button class="primary-button" type="button" data-restart>${esc(t('restart'))}</button></div></section>`;
    el.actions.innerHTML = '';
    const download = el.content.querySelector('[data-download]');
    if (download) download.addEventListener('click', () => downloadPayload(buildPayload()));
    const restart = el.content.querySelector('[data-restart]');
    if (restart) restart.addEventListener('click', resetState);
  }

  function goTo(page) {
    state.page = page;
    state.maxPage = Math.max(state.maxPage, page);
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('#main').focus({ preventScroll: true });
  }

  function showFeedback(message) {
    el.feedback.textContent = message;
    el.feedback.hidden = false;
    el.feedback.focus();
  }

  function clearFeedback() { el.feedback.hidden = true; el.feedback.textContent = ''; }

  function resetState() {
    state = defaultState();
    localStorage.removeItem(STORAGE_KEY);
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  el.language.addEventListener('click', () => {
    state.language = state.language === 'en' ? 'zh' : 'en';
    saveState();
    render();
  });

  el.clear.addEventListener('click', () => {
    if (window.confirm(t('clearConfirm'))) resetState();
  });

  render();
})();
