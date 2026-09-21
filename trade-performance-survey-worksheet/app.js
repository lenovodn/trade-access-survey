(() => {
  'use strict';
  const cfg = window.SURVEY_CONFIG;
  const $ = (id) => document.getElementById(id);
  const messages = {
    en: {
      title: 'Access experience worksheet', intro: 'One worksheet, two access routes. Complete the entire A column first, including any optional exploration. Then repeat in B. Compare your answers below — no stopwatch needed.',
      headerNote: 'Read-only test · No login here',
      worksheet: 'Guided comparison', guideColumn: 'Action & instructions', columnOrder: 'Work down A first, then work down B. Do not alternate routes on each row.',
      currentRoute: 'In the route you are testing · A first, then B',
      columnHintA: 'First pass: complete all four A ratings, then optional A exploration.', columnHintB: 'Second pass: repeat all four steps in B, then optional B exploration.',
      jumpA: 'A · first unanswered', jumpB: 'B · first unanswered', jumpCompare: 'Compare below', jumpProfile: 'Testing details',
      complete: '{count} / {total} required answers', routeComplete: '{count} / 4 rated', routeDone: 'All four ratings in route {route} are answered. You can review them here.',
      fillEmpty: 'Mark empty ratings “Not attempted”', filled: 'Route {route}: {count} empty ratings marked “Not attempted”. Existing answers were kept.',
      guides: 'Show visual guide', profileCount: '{count} / 6 filled', optionalSection: 'Optional exploration · A / B',
      explorationOrder: 'After the four guided steps in each route, explore if you wish and record it in that route’s card. Complete A before opening B.',
      comparisonLabel: 'Overall comparison · Q11–Q14', localImages: 'Only reviewed local screenshots are displayed; external images are not loaded.',
      viewWorksheet: 'Review worksheet', ratingEmpty: 'Unanswered', ratingSaved: 'Answered', shortDownload: 'Download JSON',
      instructionNote: 'Keep this worksheet open. The business system opens in a separate tab; return here to record each answer.',
      mockEmail: 'Email', mockPassword: 'Password', mockLogin: 'Log in', mockMilestones: 'Milestones / Work orders',
      setup: 'Template preview — the submission API is not configured. You can fill in and download answers; nothing will be sent.',
      missing: 'Setup incomplete: the organizer still needs to provide {fields}. You can preview this form, but online submission is disabled.',
      configLabels: { contact: 'a feedback contact', orderNumber: 'the order number', privacy: 'the data notice', exit: 'the page-exit instruction' },
      details: 'Your testing details', required: '* Required', tester: 'Your name / test identifier', testerHint: 'Use the identifier provided by your organizer, or your name.', location: 'Country and city', locationHint: 'Country, city — no street address',
      browser: 'Browser', device: 'Device', network: 'Network', vpn: 'VPN or proxy', choose: 'Select an option',
      browserOpts: ['Google Chrome', 'Microsoft Edge', 'Mozilla Firefox', 'Apple Safari', 'Other / not sure'],
      deviceOpts: ['Windows computer', 'macOS computer', 'Android', 'iPhone / iPad', 'Other'],
      networkOpts: ['Company network', 'Home network', 'Mobile hotspot', 'Other', 'Not sure'], vpnOpts: ['Enabled', 'Disabled', 'Not sure'],
      sameEnvironment: 'Keep it consistent.', environmentText: 'Use the same account, browser, device and network for both routes. Keep your usual VPN settings. Do not clear caches, repeatedly refresh, or change business data.',
      first: 'FIRST', second: 'SECOND', download: 'Download answers (JSON)', submit: 'Submit feedback', submitting: 'Submitting…',
      draft: 'Answers are saved temporarily in this tab and cleared after confirmed submission. On a shared device, use “Clear answers” when finished.', noStorage: 'Tab storage unavailable. Keep this page open; a refresh may lose answers.', clear: 'Clear answers', clearConfirm: 'Clear all answers in this tab and start again?',
      rated: '{count} of 8 steps rated', route: 'ROUTE {route}', step: 'STEP {step} OF 4', optional: 'OPTIONAL',
      steps: ['Sign in & enter your FlowSpace', 'Open the order list', 'Search for & open the order', 'Open a work order'],
      stepIntro: 'Complete the action in the business-system tab, then return here to rate this step.',
      instructions: [
        'Open the route you are currently testing and sign in with your authorized account. Choose {flow}. When the workspace name and navigation appear, rate this step in the corresponding column.',
        'Open the order list and wait for order records to appear. Look out for prolonged loading, a blank screen or an error. You do not need developer tools.',
        'Search for order {order}, then open its details. Wait for the basic information and milestone area. Use the same order for both routes.',
        'If convenient, open an accessible work order from the order’s milestones and wait for the form. Use the same work order in both routes where possible. Do not save, submit, approve, delete, or send emails.'
      ],
      orderUnknown: 'specified by your organizer (not yet configured)', openRoute: 'Open route {route}', newTab: 'Opens in a separate tab · return here to rate',
      figure: ['Sign-in screen', 'Choose your FlowSpace', 'Order list', 'Order details'], diagram: 'Illustration only — replace with a reviewed, redacted screenshot before release.', screenshot: 'Guide screenshot', imageFailed: 'Screenshot unavailable. Follow the written instructions.',
      rate: 'How did this step feel?', rateHelp: 'Choose one answer based on your experience — no timing required.',
      ratings: ['Smooth', 'Some waiting', 'Noticeably slow, but completed', 'Could not complete / could not continue', 'Not attempted'],
      rateNote: 'If a previous step blocked you, choose “Not attempted”. Partial results are still useful.', skip: 'Mark remaining steps “Not attempted”', skipHint: 'Only unanswered steps in this route will be marked; existing ratings will be kept.', skipWork: 'Skip the optional work order',
      exploreTitle: 'Anything else you would like to explore?', exploreIntro: 'The guided steps are done. You may now browse other pages you can access, or skip this section.',
      exploreRules: 'You can view other orders, milestones and work orders, switch menus, search, filter and turn pages. Stay read-only: do not create, edit, delete, submit, approve or send anything.',
      browseQuestion: 'Q15 · What else did you explore? (optional, select any)', browseOpts: ['Other orders', 'Other work orders / milestones', 'Filters / pagination', 'Other menus', 'I did not explore other pages'],
      notes: 'Q16 · Anything to add? (optional)', notesHint: 'For example: route B, search kept loading. Please do not include passwords or confidential customer data.',
      problemTitle: 'If something goes wrong', problems: ['Do not repeatedly refresh or bypass certificate warnings. Stop the step if you cannot continue.', 'If an order is missing or you lack access, contact the organizer; do not substitute another order in the guided comparison.', 'Do not share passwords, cookies, verification codes, access tokens or network captures. Redact personal and business data in screenshots.'],
      contact: 'Contact', contactUnknown: 'The organizer has not provided a contact yet.', exitTitle: 'Before leaving this route', exitUnknown: 'The organizer must confirm the page-exit / reporting rule before release. Loading a page is not proof that performance data was saved.',
      compareTitle: 'Two routes. What did you notice?', compareIntro: 'Review both columns above, then share your overall impression. Edit any answer in this worksheet before submitting.',
      q11: 'Q11 · Which route felt faster overall?', fasterOpts: ['Route A', 'Route B', 'No noticeable difference', 'Cannot judge / did not finish both routes'],
      q12: 'Q12 · Where was the speed difference most noticeable?', diffOpts: ['Sign-in / FlowSpace', 'Order list', 'Search', 'Order details', 'Work order', 'No noticeable difference', 'Cannot judge'],
      multiHelp: 'Select all that apply. “No difference” and “Cannot judge” cannot be combined with other choices.',
      q13: 'Q13 · Which route had a problem?', errorRouteOpts: ['No problems in either route', 'Route A only', 'Route B only', 'Both routes', 'Cannot judge / not tested'],
      q14: 'Q14 · What problems occurred?', errorTypeOpts: ['Persistent loading / blank page', 'Error message', 'Could not sign in or open the page', 'Missing order / insufficient access', 'Other'],
      privacyTitle: 'About your feedback', privacyUnknown: 'The organizer has not yet provided the confirmed data-use and retention notice. This must be completed before online collection.',
      formScope: 'This survey sends your identifier, country/city, selected environment details and answers. It does not read your business-system account, cookies or page timings. Server receipt time is recorded by the backend.',
      localOnly: 'No API is configured. Download a JSON copy to inspect the request structure or share it with the organizer. Downloading does not submit anything.',
      fieldError: 'Please complete the required field: {field}.', rateError: 'Please rate this step or choose “Not attempted”.', compareError: 'Please answer {field}.',
      incomplete: 'Some route ratings are missing. Returning to the first unanswered step; choose “Not attempted” if it was skipped.',
      requestFailed: 'Submission was not confirmed. Your answers remain here. Check your connection or contact the organizer. A retry uses the same submission identifier.',
      timeout: 'The request timed out; the server may or may not have saved it. Your answers remain here. Retry with the same identifier or contact the organizer.',
      endpointError: 'The endpoint must be a valid HTTPS URL (HTTP is allowed only on localhost for testing).',
      successTitle: 'Thank you for helping us improve.', successIntro: 'The server confirmed your feedback was saved. You may close this page.', successId: 'Submission identifier',
      untitled: 'Not yet answered', downloadSuccess: 'JSON exported. No data was submitted.', reset: 'Start a new response',
      questions: 'Testing guide', stepResult: 'Step {step}', optionalSkip: 'Not attempted (optional)', loading: 'Waiting for server confirmation…'
    },
    zh: {
      title: '访问体验对照工作表', intro: '所有问题都在这一页。请先完成 A 整列及可选自由浏览，再在 B 入口重复操作；最后在下方比较两轮答案，无需计时。',
      headerNote: '只读体验 · 问卷无需登录',
      worksheet: '操作对照工作表', guideColumn: '操作与指引', columnOrder: '先从上到下完成 A 整列，再完成 B 整列。不要逐行在 A / B 之间来回切换。',
      currentRoute: '在本轮对应入口操作 · 先 A 后 B',
      columnHintA: '第一轮：完成全部四项 A 评价，再按需自由浏览 A。', columnHintB: '第二轮：在 B 重复四步操作，再按需自由浏览 B。',
      jumpA: 'A · 首个未答', jumpB: 'B · 首个未答', jumpCompare: '跳到比较', jumpProfile: '测试信息',
      complete: '已答 {count} / {total} 个必填项', routeComplete: '已评价 {count} / 4 步', routeDone: '入口 {route} 的四项评分均已填写，可在此核对。',
      fillEmpty: '将空评分标为“未操作”', filled: '入口 {route}：已将 {count} 个空评分标为“未操作”，原有答案保持不变。',
      guides: '展开操作示意图', profileCount: '已填 {count} / 6 项', optionalSection: '可选自由浏览 · A / B',
      explorationOrder: '每个入口完成四步操作后，可按需自由浏览，并在对应卡片中记录。请完成 A 后再打开 B。',
      comparisonLabel: '整体比较 · Q11–Q14', localImages: '仅展示经过确认的本地脱敏截图，不加载外部图片。',
      viewWorksheet: '核对工作表', ratingEmpty: '未答', ratingSaved: '已答', shortDownload: '下载 JSON',
      instructionNote: '请保留工作表页面。业务系统将在新标签页打开，每次操作后返回此处记录答案。',
      mockEmail: '邮箱', mockPassword: '密码', mockLogin: '登录', mockMilestones: '里程碑 / 工单',
      setup: '模板预览：尚未配置提交接口。可以填写、下载答案，但不会发送任何数据。',
      missing: '发布信息尚未补齐：{fields}。可以预览问卷，但暂不能在线提交。',
      configLabels: { contact: '反馈联系人', orderNumber: '指定订单编号', privacy: '采集告知', exit: '离开页面规则' },
      details: '您的测试信息', required: '* 必填', tester: '测试人员姓名 / 测试标识', testerHint: '填写工作人员提供的标识，或您的姓名', location: '所在国家与城市', locationHint: '国家、城市，不需要详细地址',
      browser: '浏览器', device: '设备', network: '网络类型', vpn: 'VPN 或代理', choose: '请选择',
      browserOpts: ['Google Chrome', 'Microsoft Edge', 'Mozilla Firefox', 'Apple Safari', '其他 / 不确定'],
      deviceOpts: ['Windows 电脑', 'macOS 电脑', 'Android', 'iPhone / iPad', '其他'], networkOpts: ['公司网络', '家庭网络', '手机热点', '其他', '不确定'], vpnOpts: ['启用', '未启用', '不确定'],
      sameEnvironment: '保持两轮环境一致。', environmentText: '使用同一账号、浏览器、设备和网络，保持日常 VPN 状态。不主动清缓存，不反复刷新，不修改业务数据。',
      first: '先测', second: '后测', download: '下载答案 JSON', submit: '提交反馈', submitting: '提交中…',
      draft: '答案暂存在当前标签页，提交确认成功后清除；使用共享设备时，结束后请点击“清空答案”。', noStorage: '当前浏览器不支持暂存，请保持页面打开，刷新可能丢失答案。', clear: '清空答案', clearConfirm: '确认清空当前标签页的所有答案，重新开始吗？',
      rated: '已评价 {count} / 8 个步骤', route: '入口 {route}', step: '第 {step} / 4 步', optional: '可选',
      steps: ['登录并进入 FlowSpace', '打开订单列表', '搜索并打开指定订单', '打开工单'],
      stepIntro: '在业务系统标签页完成操作，然后回到本页立即评价。',
      instructions: [
        '打开本轮对应入口，使用获授权的账号登录，选择 {flow}。工作空间名称和导航区域出现后，在对应入口列评价本步体验。',
        '进入订单列表，等待订单记录显示。留意长时间转圈、空白或报错；不需要打开开发者工具，也不需要自行计时。',
        '搜索指定订单 {order}，打开订单详情，等待基本信息和里程碑区域显示。两轮使用同一订单，方便比较。',
        '如方便，在该订单的里程碑中打开一个有权限查看的工单，等待表单显示。两轮尽量使用同一工单。只查看，不保存、提交、审批、删除或发送邮件。'
      ],
      orderUnknown: '（待工作人员提供）', openRoute: '打开入口 {route}', newTab: '在新标签页打开 · 操作后请返回此处评价',
      figure: ['登录页面', '选择指定 FlowSpace', '订单列表', '订单详情'], diagram: '仅为操作示意图，发布前可替换为已确认、脱敏的真实截图。', screenshot: '操作截图', imageFailed: '截图暂不可用，请参考文字指引。',
      rate: '这一步的体验如何？', rateHelp: '根据实际感受单选一项，无需计算秒数。', ratings: ['顺畅', '有些等待', '明显缓慢，但已完成', '无法完成 / 无法继续', '未操作'],
      rateNote: '如果前一步受阻导致无法操作，请选“未操作”。未完成全部步骤也可以反馈。', skip: '将本轮剩余未评价步骤标为“未操作”', skipHint: '仅补齐尚未评价的步骤，保留您已填写的评分。', skipWork: '跳过可选工单',
      exploreTitle: '还想看看其他页面吗？', exploreIntro: '主要步骤已完成，您可以自由浏览其他有权限的页面，也可以跳过。',
      exploreRules: '可以查看其他订单、里程碑、工单，切换菜单、搜索、筛选或翻页。保持只读：不新增、修改、删除、提交、审批或发送任何内容。',
      browseQuestion: 'Q15 · 您还浏览了哪些页面？（选填、多选）', browseOpts: ['其他订单', '其他工单 / 里程碑', '筛选 / 翻页', '其他菜单', '未自由浏览'],
      notes: 'Q16 · 补充说明或建议（选填）', notesHint: '例如：B 入口搜索后一直转圈。不要包含密码或客户敏感信息。',
      problemTitle: '遇到问题时', problems: ['不要连续刷新或绕过证书警告；无法继续时可停止该步骤。', '找不到订单或没有权限时请联系工作人员，必要对比步骤不要随意更换订单。', '不要提供密码、Cookie、验证码、令牌或网络抓包；截图请遮盖个人和业务敏感信息。'],
      contact: '反馈联系人', contactUnknown: '工作人员尚未填写联系方式。', exitTitle: '离开本轮页面前', exitUnknown: '发布前需由工作人员确认上报与离开页面规则；页面加载完成，不等于性能数据已成功保存。',
      compareTitle: '两个入口，哪个体验更好？', compareIntro: '核对上方两列评分，再告诉我们您的整体感受。提交前可在本页直接修改任何答案。',
      q11: 'Q11 · 整体上哪个入口更快？（单选）', fasterOpts: ['入口 A 更快', '入口 B 更快', '无明显差别', '无法判断 / 未完成两轮'],
      q12: 'Q12 · 哪些页面的速度差异最明显？（多选）', diffOpts: ['登录 / FlowSpace', '订单列表', '搜索', '订单详情', '工单', '无明显差别', '无法判断'], multiHelp: '可多选；“无明显差别”或“无法判断”不能与其他选项同时选择。',
      q13: 'Q13 · 哪个入口出现过异常？（单选）', errorRouteOpts: ['两轮均无异常', '仅入口 A', '仅入口 B', '两个入口均有', '无法判断 / 未测试'],
      q14: 'Q14 · 出现过哪些异常？（多选）', errorTypeOpts: ['持续转圈 / 空白', '报错提示', '无法登录或打开', '找不到订单 / 权限不足', '其他'],
      privacyTitle: '关于本次反馈', privacyUnknown: '工作人员尚未提供经确认的采集用途与保存安排，在线收集前需先补齐。',
      formScope: '本问卷提交测试标识、国家城市、所选设备网络信息和答案，不读取业务系统账号、Cookie 或页面耗时；接收时间由后端记录。',
      localOnly: '接口尚未配置。可下载 JSON 查看请求结构或交给工作人员；下载不代表已提交。',
      fieldError: '请填写必填项：{field}。', rateError: '请评价当前步骤，或选择“未操作”。', compareError: '请回答 {field}。',
      incomplete: '还有步骤尚未评价，已跳转到第一个未填写步骤；如果未执行，请选择“未操作”。',
      requestFailed: '未能确认提交成功，答案仍保留。请检查网络或联系工作人员；重试会使用同一个提交标识。',
      timeout: '请求超时，无法确认后端是否已保存。答案仍保留，请使用相同提交标识重试或联系工作人员。',
      endpointError: '接口必须是合法的 HTTPS 地址（仅本地测试允许 localhost 使用 HTTP）。',
      successTitle: '感谢您，让体验更好。', successIntro: '后端已确认反馈保存成功，您可以关闭本页。', successId: '提交标识',
      untitled: '尚未评价', downloadSuccess: '已导出 JSON，未向后端提交。', reset: '开始新的反馈', questions: '操作指引', stepResult: '第 {step} 步', optionalSkip: '未操作（可选）', loading: '正在等待后端确认保存…'
    }
  };
  const storageKey = 'linkincrease-survey:' + cfg.surveyId;
  let storageAvailable = true;
  let busy = false;
  let succeeded = false;
  let controller;
  const profileFields = ['tester', 'location', 'browser', 'device', 'network', 'vpn'];
  const profileOptions = { browser: 5, device: 5, network: 5, vpn: 3 };
  const fresh = () => ({ version: 1, language: cfg.defaultLanguage === 'zh' ? 'zh' : 'en',
    submissionId: crypto.randomUUID(), profile: { tester: '', location: '', browser: '', device: '', network: '', vpn: '' },
    routes: { A: { ratings: [null, null, null, null], browsing: [], notes: '' }, B: { ratings: [null, null, null, null], browsing: [], notes: '' } },
    comparison: { faster: null, differences: [], problemRoutes: null, problemTypes: [] } });
  let state = fresh();
  const validNumber = (n, max) => Number.isInteger(n) && n >= 1 && n <= max;
  const validList = (a, max) => Array.isArray(a) && a.length <= max && new Set(a).size === a.length && a.every(n => validNumber(n, max));
  const exclusiveList = (a, exclusive) => !a.some(n => exclusive.includes(n)) || a.length === 1;
  function restore(value) {
    if (value?.version !== 1 || !['en', 'zh'].includes(value.language) ||
      typeof value.submissionId !== 'string' || !/^[a-f0-9-]{36}$/i.test(value.submissionId)) return false;
    for (const [key, max] of Object.entries({ tester: 100, location: 120, browser: 1, device: 1, network: 1, vpn: 1 })) {
      const v = value.profile?.[key];
      if (typeof v !== 'string' || v.length > max || (profileOptions[key] && v !== '' && !validNumber(Number(v), profileOptions[key]))) return false;
    }
    for (const r of ['A', 'B']) {
      const v = value.routes?.[r];
      if (!v || !Array.isArray(v.ratings) || v.ratings.length !== 4 || !v.ratings.every(n => n === null || validNumber(n, 5)) ||
        !validList(v.browsing, 5) || !exclusiveList(v.browsing, [5]) || typeof v.notes !== 'string' || v.notes.length > 2000) return false;
    }
    const c = value.comparison;
    return c && (c.faster === null || validNumber(c.faster, 4)) && validList(c.differences, 7) && exclusiveList(c.differences, [6, 7]) &&
      (c.problemRoutes === null || validNumber(c.problemRoutes, 5)) && validList(c.problemTypes, 5);
  }
  try {
    const cached = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    if (cached && restore(cached)) {
      state = { version: 1, language: cached.language, submissionId: cached.submissionId,
        profile: cached.profile, routes: cached.routes, comparison: cached.comparison };
      if (![2, 3, 4].includes(state.comparison.problemRoutes)) state.comparison.problemTypes = [];
    }
  } catch { storageAvailable = false; }
  const t = (key, values = {}) => {
    let value = messages[state.language][key];
    if (typeof value !== 'string') return value;
    for (const [name, replacement] of Object.entries(values)) value = value.replaceAll('{' + name + '}', String(replacement));
    return value;
  };
  const escape = (value) => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const el = (name, attrs = {}) => { const n = document.createElement(name); Object.assign(n, attrs); return n; };
  const missingConfig = () => [!cfg.contact && 'contact', !cfg.orderNumber && 'orderNumber', !cfg.privacyNotice[state.language] && 'privacy', !cfg.pageExitInstruction[state.language] && 'exit'].filter(Boolean);
  const profileAnswered = key => {
    const value = state.profile[key];
    return !!value.trim() && (!profileOptions[key] || validNumber(Number(value), profileOptions[key]));
  };
  function save() {
    if (succeeded) return;
    try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { storageAvailable = false; }
    $('draft-status').textContent = t(storageAvailable ? 'draft' : 'noStorage');
  }
  function rated() { return ['A', 'B'].reduce((n, r) => n + state.routes[r].ratings.filter(v => v !== null).length, 0); }
  function updateProgress() {
    const profileCount = profileFields.filter(profileAnswered).length;
    const c = state.comparison;
    const needsProblems = [2, 3, 4].includes(c.problemRoutes);
    const comparisonCount = Number(c.faster !== null) + Number(c.differences.length > 0) + Number(c.problemRoutes !== null) + Number(needsProblems && c.problemTypes.length > 0);
    const count = profileCount + rated() + comparisonCount;
    const total = 17 + Number(needsProblems);
    $('progress-label').textContent = t('complete', { count, total });
    $('footer-progress').textContent = t('complete', { count, total });
    $('rating-progress').textContent = t('rated', { count: rated() });
    $('progress-fill').style.width = (count / total * 100) + '%';
    const track = $('progress-track');
    track.setAttribute('aria-valuenow', String(count));
    track.setAttribute('aria-valuemax', String(total));
    track.setAttribute('aria-valuetext', t('complete', { count, total }));
    if ($('profile-count')) $('profile-count').textContent = t('profileCount', { count: profileCount });
    for (const route of ['A', 'B']) {
      const ratings = state.routes[route].ratings;
      if ($('route-count-' + route)) $('route-count-' + route).textContent = t('routeComplete', { count: ratings.filter(v => v !== null).length });
      const fill = $('mark-empty-' + route);
      if (fill) fill.disabled = busy || !ratings.includes(null);
      ratings.forEach((value, step) => {
        const cell = $('rating-cell-' + route + '-' + step);
        if (cell) {
          cell.classList.toggle('answered', value !== null);
          cell.querySelector('.answer-status').textContent = t(value === null ? 'ratingEmpty' : 'ratingSaved');
        }
      });
    }
  }
  function feedback(message, focus = true) {
    $('feedback').textContent = message;
    $('feedback').hidden = false;
    if (focus) focusAt('feedback');
  }
  function focusAt(id) {
    const target = $(id);
    if (!target) return;
    let parent = target.parentElement;
    while (parent) {
      if (parent.tagName === 'DETAILS') parent.open = true;
      parent = parent.parentElement;
    }
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'center', behavior: 'auto' });
  }
  function jumpRoute(route) {
    if (busy) return;
    const step = state.routes[route].ratings.findIndex(v => v === null);
    if (step < 0) {
      feedback(t('routeDone', { route }), false);
      focusAt('route-heading-' + route);
    } else focusAt('rating-' + route + '-' + step + '-1');
  }
  function button(text, action, style = 'secondary', id = '') {
    const b = el('button', { type: 'button', className: 'button ' + style, textContent: text, disabled: busy });
    if (id) b.id = id;
    b.addEventListener('click', action);
    return b;
  }
  function jumpControls(suffix = '') {
    const box = el('nav', { className: 'quick-jumps' });
    box.setAttribute('aria-label', t('viewWorksheet'));
    box.append(button(t('jumpA'), () => jumpRoute('A'), 'jump jump-a', 'jump-A' + suffix),
      button(t('jumpB'), () => jumpRoute('B'), 'jump jump-b', 'jump-B' + suffix),
      button(t('jumpCompare'), () => focusAt('comparison-heading'), 'jump', 'jump-compare' + suffix));
    return box;
  }
  function markEmpty(route) {
    if (busy) return;
    let count = 0;
    state.routes[route].ratings = state.routes[route].ratings.map((value, step) => {
      if (value !== null) return value;
      count += 1;
      $('rating-' + route + '-' + step + '-5').checked = true;
      return 5;
    });
    save(); updateProgress();
    feedback(t('filled', { route, count }), false);
  }
  function choiceGroup({ title, name, options, selected, onChange, multi = false, exclusive = [], help = '' }) {
    const fs = el('fieldset', { className: 'choices', id: 'group-' + name });
    fs.append(el('legend', { textContent: title }));
    const grid = el('div', { className: 'choice-grid' });
    const inputs = [];
    options.forEach((label, i) => {
      const n = i + 1;
      const wrap = el('label', { className: 'choice' });
      const input = el('input', { type: multi ? 'checkbox' : 'radio', name, value: String(n), checked: multi ? selected.includes(n) : selected === n });
      input.id = name + '-' + n;
      inputs.push(input);
      input.addEventListener('change', () => {
        if (busy) return;
        if (multi) {
          if (input.checked) {
            inputs.forEach(other => {
              if (other !== input && (exclusive.includes(n) || exclusive.includes(Number(other.value)))) other.checked = false;
            });
          }
          onChange(inputs.filter(x => x.checked).map(x => Number(x.value)));
        } else onChange(n);
        inputs.forEach(other => other.removeAttribute('aria-invalid'));
        save(); updateProgress();
        $('feedback').hidden = true;
      });
      wrap.append(input, el('span', { textContent: label }));
      grid.append(wrap);
    });
    fs.append(grid);
    if (help) {
      fs.append(el('p', { className: 'help', id: name + '-help', textContent: help }));
      fs.setAttribute('aria-describedby', name + '-help');
    }
    return fs;
  }
  function renderProfile() {
    const details = el('details', { id: 'profile-panel', className: 'profile-panel', open: true });
    details.innerHTML = `<summary id="profile-summary"><span>${escape(t('details'))}</span><span class="summary-meta"><span id="profile-count"></span><span>${escape(t('required'))}</span></span></summary><div class="form-grid" id="profile-fields"></div>`;
    $('content').append(details);
    const fields = [
      ['tester', null, 'testerHint', 100], ['location', null, 'locationHint', 120],
      ['browser', 'browserOpts'], ['device', 'deviceOpts'], ['network', 'networkOpts'], ['vpn', 'vpnOpts']
    ];
    for (const [key, opts, hint, maxlength] of fields) {
      const label = el('label', { className: 'field' });
      const title = el('span', { textContent: t(key) });
      title.append(el('b', { className: 'required', textContent: ' *' }));
      const input = el(opts ? 'select' : 'input', { id: 'profile-' + key, name: key, required: true });
      if (opts) {
        input.append(el('option', { value: '', textContent: t('choose') }));
        t(opts).forEach((v, i) => input.append(el('option', { value: String(i + 1), textContent: v })));
      } else {
        input.type = 'text'; input.maxLength = maxlength; input.placeholder = t(hint); input.autocomplete = 'off';
      }
      input.value = state.profile[key];
      input.addEventListener('input', () => {
        if (busy) return;
        if (maxlength) input.value = input.value.slice(0, maxlength);
        state.profile[key] = input.value;
        input.removeAttribute('aria-invalid');
        save(); updateProgress();
        $('feedback').hidden = true;
      });
      label.append(title, input); $('profile-fields').append(label);
    }
    const note = el('p', { className: 'environment-note' });
    note.innerHTML = `<strong>${escape(t('sameEnvironment'))}</strong> ${escape(t('environmentText'))}`;
    $('content').append(note);
  }
  function profileValid() {
    for (const key of profileFields) {
      if (!profileAnswered(key)) {
        feedback(t('fieldError', { field: t(key) }), false);
        $('profile-' + key).setAttribute('aria-invalid', 'true');
        focusAt('profile-' + key); return false;
      }
    }
    return true;
  }
  function schematic(kind) {
    const title = ['Linkincrease', cfg.flowSpace, t('steps')[1], t('steps')[2]][kind];
    const contents = kind === 0 ? `<div class="mock-field">${escape(t('mockEmail'))}</div><div class="mock-field">${escape(t('mockPassword'))}</div><div class="mock-action">${escape(t('mockLogin'))}</div>` :
      kind === 1 ? `<div class="mock-chip">${escape(cfg.flowSpace)}</div>` : kind === 2 ? '<div class="mock-table"><div class="mock-row"></div><div class="mock-row"></div><div class="mock-row"></div><div class="mock-row"></div></div>' : `<div class="mock-columns"><div></div><div></div></div><div class="mock-chip">${escape(t('mockMilestones'))}</div>`;
    return `<div class="schematic" aria-hidden="true"><div class="mock-window"><div class="mock-dots"><i></i><i></i><i></i></div><div class="mock-title">${escape(title)}</div>${contents}</div></div>`;
  }
  function figure(kind) {
    const key = ['login', 'flowspace', 'orders', 'detail'][kind];
    const f = el('figure', { className: 'illustration' });
    const src = cfg.screenshots[key];
    if (src) {
      try {
        const url = new URL(src, document.baseURI);
        const base = new URL(document.baseURI);
        if (!['http:', 'https:', 'file:'].includes(url.protocol) || url.origin !== base.origin ||
          (url.protocol === 'file:' && base.protocol !== 'file:') || url.username || url.password) throw Error('Local image URL required');
        const img = el('img', { src: url.href, alt: t('figure')[kind], loading: 'lazy', referrerPolicy: 'no-referrer' });
        img.addEventListener('error', () => { img.replaceWith(el('p', { className: 'help', textContent: t('imageFailed') })); });
        f.append(img);
      } catch { f.append(el('p', { className: 'help', textContent: t('imageFailed') + ' ' + t('localImages') })); }
    } else f.innerHTML = schematic(kind);
    f.append(el('figcaption', { textContent: t('figure')[kind] + ' · ' + t(src ? 'screenshot' : 'diagram') }));
    return f;
  }
  function openRouteLink(route, id) {
    const a = el('a', { className: 'button route-link', textContent: t('openRoute', { route }), target: '_blank', rel: 'noopener noreferrer', referrerPolicy: 'no-referrer' });
    if (id) a.id = id;
    try {
      const url = new URL(cfg.routes[route]);
      if (url.protocol !== 'https:' || url.username || url.password) throw Error('Business route must use HTTPS');
      a.href = url.href;
    } catch { a.setAttribute('aria-disabled', 'true'); }
    return a;
  }
  function renderWorksheet() {
    const section = el('section', { id: 'worksheet', className: 'worksheet-section' });
    section.setAttribute('aria-labelledby', 'worksheet-heading');
    section.innerHTML = `<div class="section-heading"><h2 id="worksheet-heading" tabindex="-1">${escape(t('worksheet'))}</h2><span>${escape(t('required'))}</span></div><p class="column-order">${escape(t('columnOrder'))}</p><p class="help">${escape(t('instructionNote'))} ${escape(t('rateHelp'))}</p><div class="worksheet" id="worksheet-matrix"><div class="worksheet-head" id="worksheet-head"><div class="guide-heading"><span class="eyebrow">Q7–Q10</span><h3>${escape(t('guideColumn'))}</h3><p>${escape(t('rateNote'))}</p></div></div></div>`;
    $('content').append(section);
    for (const route of ['A', 'B']) {
      const header = el('div', { className: 'route-heading route-' + route.toLowerCase(), id: 'route-heading-' + route, tabIndex: -1 });
      header.innerHTML = `<div class="route-title"><h3><span class="route-letter">${route}</span>${escape(t('route', { route }))}</h3><span class="pass-tag">${escape(t(route === 'A' ? 'first' : 'second'))}</span></div><p class="route-direction">${escape(t('columnHint' + route))}</p><p class="route-url">${escape(cfg.routes[route])}</p>`;
      header.append(openRouteLink(route, 'route-link-' + route));
      header.append(el('p', { className: 'help', textContent: t('newTab') }));
      const tools = el('div', { className: 'column-tools' });
      tools.append(el('strong', { id: 'route-count-' + route, className: 'route-count' }),
        button(t('fillEmpty'), () => markEmpty(route), 'fill-empty', 'mark-empty-' + route));
      header.append(tools, el('p', { className: 'help', textContent: t('skipHint') }));
      $('worksheet-head').append(header);
    }
    for (let step = 0; step < 4; step += 1) {
      const row = el('section', { className: 'worksheet-row', id: 'step-row-' + step });
      row.setAttribute('aria-labelledby', 'step-title-' + step);
      const guide = el('div', { className: 'step-guide' });
      const instruction = t('instructions')[step].replaceAll('{flow}', cfg.flowSpace).replaceAll('{order}', cfg.orderNumber || t('orderUnknown'));
      guide.innerHTML = `<div class="step-heading"><span class="step-number">${String(step + 1).padStart(2, '0')}</span><h3 id="step-title-${step}">${escape(t('steps')[step])}</h3></div>${step === 3 ? `<span class="optional-tag">${escape(t('optional'))}</span>` : ''}<p class="route-scope">${escape(t('currentRoute'))}</p><p class="step-instructions" id="instruction-${step}">${escape(instruction)}</p>`;
      const kinds = step === 0 ? [0, 1] : step === 1 ? [2] : step === 2 ? [3] : [];
      if (kinds.length) {
        const details = el('details', { className: 'visual-guide', id: 'guide-' + step });
        details.append(el('summary', { textContent: t('guides') + ' (' + kinds.length + ')' }));
        kinds.forEach(kind => details.append(figure(kind)));
        guide.append(details);
      }
      row.append(guide);
      for (const route of ['A', 'B']) {
        const cell = el('div', { className: 'rating-cell route-' + route.toLowerCase(), id: 'rating-cell-' + route + '-' + step });
        const status = el('span', { className: 'answer-status' });
        status.setAttribute('aria-hidden', 'true');
        const group = choiceGroup({ title: 'Q' + (7 + step) + ' · ' + t('route', { route }), name: 'rating-' + route + '-' + step,
          options: t('ratings'), selected: state.routes[route].ratings[step], onChange: v => { state.routes[route].ratings[step] = v; } });
        group.setAttribute('aria-describedby', 'step-title-' + step + ' instruction-' + step);
        cell.append(status, group);
        row.append(cell);
      }
      $('worksheet-matrix').append(row);
    }
  }
  function renderExploration() {
    const section = el('section', { id: 'exploration', className: 'exploration-section' });
    section.setAttribute('aria-labelledby', 'exploration-heading');
    section.innerHTML = `<div class="section-heading"><h2 id="exploration-heading">${escape(t('optionalSection'))}</h2><span>${escape(t('optional'))}</span></div><p>${escape(t('explorationOrder'))}</p><p class="help">${escape(t('exploreRules'))}</p><div class="explore-grid" id="explore-cards"></div>`;
    $('content').append(section);
    for (const route of ['A', 'B']) {
      const card = el('section', { className: 'explore-card route-' + route.toLowerCase(), id: 'explore-' + route });
      card.setAttribute('aria-labelledby', 'explore-title-' + route);
      const title = el('div', { className: 'explore-card-heading' });
      title.innerHTML = `<h3 id="explore-title-${route}"><span class="route-letter">${route}</span>${escape(t('route', { route }))}</h3><span class="pass-tag">${escape(t(route === 'A' ? 'first' : 'second'))}</span>`;
      card.append(title, choiceGroup({ title: t('browseQuestion'), name: 'browsing-' + route, options: t('browseOpts'), selected: state.routes[route].browsing,
        multi: true, exclusive: [5], onChange: v => { state.routes[route].browsing = v; } }));
      const label = el('label', { className: 'field notes-field' });
      const notes = el('textarea', { id: 'route-notes-' + route, name: 'route-notes-' + route, maxLength: 2000, rows: 3, placeholder: t('notesHint'), value: state.routes[route].notes });
      const counter = el('span', { className: 'character-count', id: 'notes-count-' + route, textContent: notes.value.length + ' / 2000' });
      notes.setAttribute('aria-describedby', 'notes-hint-' + route);
      notes.addEventListener('input', () => {
        if (busy) return;
        notes.value = notes.value.slice(0, 2000);
        state.routes[route].notes = notes.value;
        counter.textContent = notes.value.length + ' / 2000';
        save();
      });
      label.append(el('span', { textContent: t('notes') }), notes);
      card.append(label, el('p', { className: 'help', id: 'notes-hint-' + route, textContent: t('notesHint') }), counter);
      $('explore-cards').append(card);
    }
    const safety = el('div', { className: 'safety-grid' });
    safety.innerHTML = `<section class="safety-note"><h3>${escape(t('problemTitle'))}</h3><ul>${t('problems').map(p => `<li>${escape(p)}</li>`).join('')}</ul><p class="help">${escape(t('contact'))}: ${escape(cfg.contact || t('contactUnknown'))}</p></section><section class="safety-note"><h3>${escape(t('exitTitle'))}</h3><p>${escape(cfg.pageExitInstruction[state.language] || t('exitUnknown'))}</p></section>`;
    section.append(safety);
  }
  function renderComparison() {
    const section = el('section', { id: 'comparison', className: 'comparison-section' });
    section.setAttribute('aria-labelledby', 'comparison-heading');
    section.innerHTML = `<div class="section-heading"><h2 id="comparison-heading" tabindex="-1">${escape(t('comparisonLabel'))}</h2><span>${escape(t('required'))}</span></div><p>${escape(t('compareIntro'))}</p><div class="comparison-grid" id="comparison-questions"></div><section class="privacy-note"><h3>${escape(t('privacyTitle'))}</h3><p>${escape(cfg.privacyNotice[state.language] || t('privacyUnknown'))}</p><p>${escape(t('formScope'))}</p><p>${escape(t('contact'))}: ${escape(cfg.contact || t('contactUnknown'))}</p></section>${!cfg.endpoint ? `<p class="download-hint">${escape(t('localOnly'))}</p>` : ''}`;
    $('content').append(section);
    const specs = [
      ['faster', 'q11', 'fasterOpts', false, []], ['differences', 'q12', 'diffOpts', true, [6, 7]], ['problemRoutes', 'q13', 'errorRouteOpts', false, []]
    ];
    specs.forEach(([key, title, options, multi, exclusive]) => {
      const div = el('div', { className: 'question' });
      div.append(choiceGroup({ title: t(title), name: 'compare-' + key, options: t(options), selected: state.comparison[key], multi, exclusive,
        help: key === 'differences' ? t('multiHelp') : '', onChange: v => {
          state.comparison[key] = v;
          if (key === 'problemRoutes') {
            if (![2, 3, 4].includes(v)) state.comparison.problemTypes = [];
            renderProblemTypes();
          }
        } }));
      $('comparison-questions').append(div);
    });
    $('comparison-questions').append(el('div', { id: 'problem-types', className: 'question' }));
    renderProblemTypes();
  }
  function renderProblemTypes() {
    const box = $('problem-types');
    if (!box) return;
    box.replaceChildren(); box.hidden = ![2, 3, 4].includes(state.comparison.problemRoutes);
    if (!box.hidden) box.append(choiceGroup({ title: t('q14'), name: 'compare-problemTypes', options: t('errorTypeOpts'), selected: state.comparison.problemTypes,
      multi: true, onChange: v => { state.comparison.problemTypes = v; } }));
  }
  function validation() {
    if (!profileValid()) return false;
    for (const route of ['A', 'B']) {
      const missing = state.routes[route].ratings.findIndex(v => v === null);
      if (missing !== -1) {
        feedback(t('incomplete'), false);
        const id = 'rating-' + route + '-' + missing + '-1';
        $(id).setAttribute('aria-invalid', 'true');
        focusAt(id); return false;
      }
    }
    for (const [key, label] of [['faster', 'Q11'], ['differences', 'Q12'], ['problemRoutes', 'Q13'], ['problemTypes', 'Q14']]) {
      if (key === 'problemTypes' && ![2, 3, 4].includes(state.comparison.problemRoutes)) continue;
      const value = state.comparison[key];
      if (value === null || (Array.isArray(value) && !value.length)) {
        feedback(t('compareError', { field: label }), false);
        const id = 'compare-' + key + '-1';
        $(id).setAttribute('aria-invalid', 'true');
        focusAt(id); return false;
      }
    }
    return true;
  }
  function payload() {
    return { surveyId: cfg.surveyId, schemaVersion: 1, submissionId: state.submissionId, language: state.language,
      participant: { identifier: state.profile.tester.trim(), countryCity: state.profile.location.trim(), browser: Number(state.profile.browser), device: Number(state.profile.device), network: Number(state.profile.network), vpn: Number(state.profile.vpn) },
      context: { flowSpace: cfg.flowSpace, orderNumber: cfg.orderNumber || null },
      routes: ['A', 'B'].map(route => ({ route, entryUrl: cfg.routes[route], answers: {
        q7: state.routes[route].ratings[0], q8: state.routes[route].ratings[1], q9: state.routes[route].ratings[2], q10: state.routes[route].ratings[3],
        q15: [...state.routes[route].browsing], q16: state.routes[route].notes.trim() } })),
      comparison: { q11: state.comparison.faster, q12: [...state.comparison.differences], q13: state.comparison.problemRoutes, q14: [...state.comparison.problemTypes] } };
  }
  function download() {
    if (busy || succeeded || !validation()) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload(), null, 2)], { type: 'application/json' }));
    const a = el('a', { href: url, download: 'trade-feedback-' + state.submissionId + '.json' });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    feedback(t('downloadSuccess'));
  }
  function lock(value) {
    busy = value;
    document.querySelectorAll('input, select, textarea, button').forEach(n => { n.disabled = value; });
    $('main').setAttribute('aria-busy', String(value));
    const submitButton = $('submit');
    if (submitButton) {
      submitButton.textContent = t(value ? 'submitting' : 'submit');
      submitButton.disabled = value || !cfg.endpoint || !!missingConfig().length;
    }
    updateProgress();
  }
  async function submit() {
    if (busy || succeeded || !validation()) return;
    if (!cfg.endpoint || missingConfig().length) { feedback(!cfg.endpoint ? t('setup') : t('missing', { fields: missingConfig().map(k => t('configLabels')[k]).join(', ') })); return; }
    let endpoint;
    try {
      endpoint = new URL(cfg.endpoint);
      if (endpoint.username || endpoint.password || endpoint.hash || (endpoint.protocol !== 'https:' && !(endpoint.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(endpoint.hostname)))) throw Error('URL');
    } catch { feedback(t('endpointError')); return; }
    const data = payload();
    controller = new AbortController();
    lock(true);
    feedback(t('loading'), false);
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint.href, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', referrerPolicy: 'no-referrer',
        cache: 'no-store', redirect: 'error', body: JSON.stringify(data), signal: controller.signal });
      if (!response.ok) throw Error('HTTP ' + response.status);
      const result = await response.json();
      if (result?.code !== 0 || result?.data?.submissionId !== data.submissionId) throw Error('Unconfirmed save');
      succeeded = true;
      try { sessionStorage.removeItem(storageKey); } catch { /* A successful save must not depend on browser storage. */ }
      lock(false); render();
    } catch (err) {
      lock(false); feedback(t(err.name === 'AbortError' ? 'timeout' : 'requestFailed'));
    } finally { clearTimeout(timeout); }
  }
  function render() {
    document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : 'en';
    document.title = 'Linkincrease · ' + t('title');
    $('language').textContent = state.language === 'zh' ? 'English' : '中文';
    $('language').lang = state.language === 'zh' ? 'en' : 'zh-CN';
    $('header-note').textContent = t('headerNote');
    $('title').textContent = t('title');
    $('intro').textContent = t('intro');
    $('skip-link').textContent = t('viewWorksheet');
    $('clear').textContent = t('clear');
    $('clear').hidden = succeeded;
    $('feedback').hidden = true;
    const warn = !cfg.endpoint ? t('setup') : missingConfig().length ? t('missing', { fields: missingConfig().map(k => t('configLabels')[k]).join(', ') }) : '';
    $('setup-warning').textContent = warn; $('setup-warning').hidden = !warn || succeeded;
    $('progress-band').hidden = succeeded;
    $('footer-progress').hidden = succeeded;
    $('top-jumps').replaceChildren();
    $('footer-jumps').replaceChildren();
    $('actions').replaceChildren();
    $('content').replaceChildren();
    if (succeeded) {
      $('content').innerHTML = `<section class="result-box" id="success" tabindex="-1"><h2>${escape(t('successTitle'))}</h2><p>${escape(t('successIntro'))}</p><p class="result-id">${escape(t('successId'))}: <strong>${escape(state.submissionId)}</strong></p></section>`;
      $('draft-status').textContent = '';
      $('actions').append(button(t('reset'), reset, 'primary', 'reset'));
      focusAt('success'); return;
    }
    $('draft-status').textContent = t(storageAvailable ? 'draft' : 'noStorage');
    $('top-jumps').append(button(t('jumpProfile'), () => focusAt('profile-summary'), 'jump', 'jump-profile'), jumpControls());
    $('footer-jumps').append(jumpControls('-footer'));
    renderProfile();
    renderWorksheet();
    renderExploration();
    renderComparison();
    const downloadButton = button(t('shortDownload'), download, 'secondary', 'download');
    downloadButton.title = t('download');
    const submitButton = button(t('submit'), submit, 'primary', 'submit');
    submitButton.disabled = !cfg.endpoint || !!missingConfig().length;
    if (submitButton.disabled) submitButton.title = warn;
    $('actions').append(downloadButton, submitButton);
    updateProgress();
  }
  function reset() {
    if (busy) return;
    if (!succeeded && !window.confirm(t('clearConfirm'))) return;
    const language = state.language;
    state = fresh(); state.language = language;
    succeeded = false;
    try { sessionStorage.removeItem(storageKey); } catch { storageAvailable = false; }
    render(); save(); focusAt('profile-tester');
  }
  $('clear').addEventListener('click', reset);
  $('language').addEventListener('click', () => {
    if (busy) return;
    const details = [...document.querySelectorAll('details[id]')].map(n => [n.id, n.open]);
    const scrollY = window.scrollY;
    state.language = state.language === 'en' ? 'zh' : 'en';
    save(); render();
    details.forEach(([id, open]) => { if ($(id)) $(id).open = open; });
    $('language').focus({ preventScroll: true });
    window.scrollTo({ top: scrollY, behavior: 'auto' });
  });
  // Reserve exactly the fixed toolbar's height, including translated status messages.
  new ResizeObserver(entries => {
    document.documentElement.style.setProperty('--dock-height', Math.ceil(entries[0].target.getBoundingClientRect().height) + 'px');
  }).observe($('action-bar'));
  render(); save();
})();
