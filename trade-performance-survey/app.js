(() => {
  'use strict';
  const cfg = window.SURVEY_CONFIG;
  const $ = (id) => document.getElementById(id);
  const messages = {
    en: {
      title: 'A better experience, together.', intro: 'Help us compare two access routes. Follow the guide, try each step, and tell us how it feels. No stopwatch needed.',
      navEyebrow: 'YOUR FEEDBACK MATTERS', navTitle: 'A little test.\nA big difference.', navDescription: 'The same workspace. Two access routes. Your real experience.',
      nav: ['Getting ready', 'Test route A', 'Test route B', 'Compare & submit'], navSub: ['A few details about you', 'Try it, then rate it', 'Repeat the same steps', 'Share your experience'],
      sidebar: 'Keep this guide open. The business system opens in a separate tab; come back here after each step.', headerNote: 'Read-only test · No login here',
      setup: 'Template preview — the submission API is not configured. You can fill in and download answers; nothing will be sent.',
      missing: 'Setup incomplete: the organizer still needs to provide {fields}. You can preview this form, but online submission is disabled.',
      configLabels: { contact: 'a feedback contact', orderNumber: 'the order number', privacy: 'the data notice', exit: 'the page-exit instruction' },
      details: 'Your testing details', required: '* Required', tester: 'Your name / test identifier', testerHint: 'Use the identifier provided by your organizer, or your name.', location: 'Country and city', locationHint: 'Country, city — no street address',
      browser: 'Browser', device: 'Device', network: 'Network', vpn: 'VPN or proxy', choose: 'Select an option',
      browserOpts: ['Google Chrome', 'Microsoft Edge', 'Mozilla Firefox', 'Apple Safari', 'Other / not sure'],
      deviceOpts: ['Windows computer', 'macOS computer', 'Android', 'iPhone / iPad', 'Other'],
      networkOpts: ['Company network', 'Home network', 'Mobile hotspot', 'Other', 'Not sure'], vpnOpts: ['Enabled', 'Disabled', 'Not sure'],
      sameEnvironment: 'Keep it consistent.', environmentText: 'Use the same account, browser, device and network for both routes. Keep your usual VPN settings. Do not clear caches, repeatedly refresh, or change business data.',
      first: 'FIRST', second: 'SECOND', readyAction: 'Start with route A', back: 'Back', next: 'Next step', review: 'Compare both routes', download: 'Download answers (JSON)', submit: 'Submit feedback', submitting: 'Submitting…',
      draft: 'Answers are saved temporarily in this tab and cleared after confirmed submission. On a shared device, use “Clear answers” when finished.', noStorage: 'Tab storage unavailable. Keep this page open; a refresh may lose answers.', clear: 'Clear answers', clearConfirm: 'Clear all answers in this tab and start again?',
      rated: '{count} of 8 steps rated', route: 'ROUTE {route}', step: 'STEP {step} OF 4', optional: 'OPTIONAL',
      steps: ['Sign in & enter your FlowSpace', 'Open the order list', 'Search for & open the order', 'Open a work order'],
      stepIntro: 'Complete the action in the business-system tab, then return here to rate this step.',
      instructions: [
        'Open route {route} and sign in with your authorized account. Choose {flow}. When the workspace name and navigation appear, rate this step below.',
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
      toB: 'Continue with route B', compareTitle: 'Two routes. What did you notice?', compareIntro: 'Review your ratings, then share your overall impression. You can go back and change any answer before submitting.',
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
      title: '一起，让访问体验更好。', intro: '帮助我们比较两个入口的访问体验。按指引操作，每完成一步就回来评价，不需要计时。',
      navEyebrow: '您的反馈很重要', navTitle: '一次小测试，\n让体验更进一步。', navDescription: '相同的工作空间，不同的访问入口。我们想了解您的真实感受。',
      nav: ['测试前准备', '体验入口 A', '体验入口 B', '对比与提交'], navSub: ['填写基本信息', '操作一步，评价一步', '重复同样的操作', '分享两轮体验'],
      sidebar: '请保留本问卷页面。业务系统将在新标签页打开；完成每一步后，回到这里评价。', headerNote: '只读体验 · 问卷无需登录',
      setup: '模板预览：尚未配置提交接口。可以填写、下载答案，但不会发送任何数据。',
      missing: '发布信息尚未补齐：{fields}。可以预览问卷，但暂不能在线提交。',
      configLabels: { contact: '反馈联系人', orderNumber: '指定订单编号', privacy: '采集告知', exit: '离开页面规则' },
      details: '您的测试信息', required: '* 必填', tester: '测试人员姓名 / 测试标识', testerHint: '填写工作人员提供的标识，或您的姓名', location: '所在国家与城市', locationHint: '国家、城市，不需要详细地址',
      browser: '浏览器', device: '设备', network: '网络类型', vpn: 'VPN 或代理', choose: '请选择',
      browserOpts: ['Google Chrome', 'Microsoft Edge', 'Mozilla Firefox', 'Apple Safari', '其他 / 不确定'],
      deviceOpts: ['Windows 电脑', 'macOS 电脑', 'Android', 'iPhone / iPad', '其他'], networkOpts: ['公司网络', '家庭网络', '手机热点', '其他', '不确定'], vpnOpts: ['启用', '未启用', '不确定'],
      sameEnvironment: '保持两轮环境一致。', environmentText: '使用同一账号、浏览器、设备和网络，保持日常 VPN 状态。不主动清缓存，不反复刷新，不修改业务数据。',
      first: '先测', second: '后测', readyAction: '开始体验入口 A', back: '上一步', next: '下一步', review: '比较两轮体验', download: '下载答案 JSON', submit: '提交反馈', submitting: '提交中…',
      draft: '答案暂存在当前标签页，提交确认成功后清除；使用共享设备时，结束后请点击“清空答案”。', noStorage: '当前浏览器不支持暂存，请保持页面打开，刷新可能丢失答案。', clear: '清空答案', clearConfirm: '确认清空当前标签页的所有答案，重新开始吗？',
      rated: '已评价 {count} / 8 个步骤', route: '入口 {route}', step: '第 {step} / 4 步', optional: '可选',
      steps: ['登录并进入 FlowSpace', '打开订单列表', '搜索并打开指定订单', '打开工单'],
      stepIntro: '在业务系统标签页完成操作，然后回到本页立即评价。',
      instructions: [
        '打开入口 {route}，使用获授权的账号登录，选择 {flow}。工作空间名称和导航区域出现后，在下方评价本步体验。',
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
      toB: '继续体验入口 B', compareTitle: '两个入口，哪个体验更好？', compareIntro: '核对步骤评分，再告诉我们您的整体感受。提交前可以返回任一步骤修改答案。',
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
  const fresh = () => ({ version: 1, language: cfg.defaultLanguage === 'zh' ? 'zh' : 'en', page: 0,
    submissionId: crypto.randomUUID(), profile: { tester: '', location: '', browser: '', device: '', network: '', vpn: '' },
    routes: { A: { ratings: [null, null, null, null], browsing: [], notes: '' }, B: { ratings: [null, null, null, null], browsing: [], notes: '' } },
    comparison: { faster: null, differences: [], problemRoutes: null, problemTypes: [] } });
  let state = fresh();
  const validNumber = (n, max) => Number.isInteger(n) && n >= 1 && n <= max;
  const validList = (a, max) => Array.isArray(a) && a.length <= max && new Set(a).size === a.length && a.every(n => validNumber(n, max));
  function restore(value) {
    if (value?.version !== 1 || !['en', 'zh'].includes(value.language) || !Number.isInteger(value.page) || value.page < 0 || value.page > 11 ||
      typeof value.submissionId !== 'string' || !/^[a-f0-9-]{36}$/i.test(value.submissionId)) return false;
    for (const [key, max] of Object.entries({ tester: 100, location: 120, browser: 1, device: 1, network: 1, vpn: 1 })) {
      if (typeof value.profile?.[key] !== 'string' || value.profile[key].length > max) return false;
    }
    for (const r of ['A', 'B']) {
      const v = value.routes?.[r];
      if (!v || !Array.isArray(v.ratings) || v.ratings.length !== 4 || !v.ratings.every(n => n === null || validNumber(n, 5)) ||
        !validList(v.browsing, 5) || typeof v.notes !== 'string' || v.notes.length > 2000) return false;
    }
    const c = value.comparison;
    return c && (c.faster === null || validNumber(c.faster, 4)) && validList(c.differences, 7) &&
      (c.problemRoutes === null || validNumber(c.problemRoutes, 5)) && validList(c.problemTypes, 5);
  }
  try {
    const cached = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    if (cached && restore(cached)) state = cached;
  } catch { storageAvailable = false; }
  const t = (key, values = {}) => {
    let value = messages[state.language][key];
    if (typeof value !== 'string') return value;
    for (const [name, replacement] of Object.entries(values)) value = value.replaceAll('{' + name + '}', String(replacement));
    return value;
  };
  const escape = (value) => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const el = (name, attrs = {}) => { const n = document.createElement(name); Object.assign(n, attrs); return n; };
  const routeFor = (page = state.page) => page >= 1 && page <= 5 ? 'A' : page >= 6 && page <= 10 ? 'B' : null;
  const stepFor = () => state.page >= 1 && state.page <= 4 ? state.page - 1 : state.page >= 6 && state.page <= 9 ? state.page - 6 : null;
  const groupFor = () => state.page === 0 ? 0 : state.page <= 5 ? 1 : state.page <= 10 ? 2 : 3;
  const missingConfig = () => [!cfg.contact && 'contact', !cfg.orderNumber && 'orderNumber', !cfg.privacyNotice[state.language] && 'privacy', !cfg.pageExitInstruction[state.language] && 'exit'].filter(Boolean);
  function save() {
    if (succeeded) return;
    try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { storageAvailable = false; }
    $('draft-status').textContent = t(storageAvailable ? 'draft' : 'noStorage');
  }
  function rated() { return ['A', 'B'].reduce((n, r) => n + state.routes[r].ratings.filter(v => v !== null).length, 0); }
  function updateProgress() {
    $('progress-label').textContent = t('rated', { count: rated() });
    $('progress-fill').style.width = (rated() / 8 * 100) + '%';
    document.querySelector('.progress-track').setAttribute('aria-valuenow', String(rated()));
  }
  function feedback(message, focus = true) {
    $('feedback').textContent = message;
    $('feedback').hidden = false;
    if (focus) $('feedback').focus();
  }
  function go(page) {
    if (busy) return;
    state.page = page;
    save(); render();
    $('main').focus();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function button(text, action, style = 'primary') {
    const b = el('button', { type: 'button', className: 'button ' + style, textContent: text, disabled: busy });
    b.addEventListener('click', action);
    return b;
  }
  function routeCard(route) {
    return `<div class="route-card"><span class="route-letter ${route === 'B' ? 'route-b' : ''}">${route}</span><div><strong>${escape(t('route', { route }))}</strong><span class="mini-tag">${escape(t(route === 'A' ? 'first' : 'second'))}</span><p>${escape(new URL(cfg.routes[route]).host)}</p></div></div>`;
  }
  function choiceGroup({ title, name, options, selected, onChange, multi = false, exclusive = [], help = '' }) {
    const fs = el('fieldset', { className: 'choices' });
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
        if (multi) {
          if (input.checked) {
            inputs.forEach(other => {
              if (other !== input && (exclusive.includes(n) || exclusive.includes(Number(other.value)))) other.checked = false;
            });
          }
          onChange(inputs.filter(x => x.checked).map(x => Number(x.value)));
        } else onChange(n);
        save(); updateProgress();
        $('feedback').hidden = true;
      });
      wrap.append(input, el('span', { textContent: label }), el('span', { className: 'choice-number', textContent: String(n) }));
      grid.append(wrap);
    });
    fs.append(grid);
    if (help) fs.append(el('p', { className: 'help', textContent: help }));
    return fs;
  }
  function profilePage() {
    $('content').innerHTML = `<p class="eyebrow">ACCESS EXPERIENCE SURVEY</p><h1>${escape(t('title'))}</h1><p class="intro">${escape(t('intro'))}</p><div class="cards">${routeCard('A')}${routeCard('B')}</div><section class="panel"><div class="panel-heading"><h2>${escape(t('details'))}</h2><span>${escape(t('required'))}</span></div><div class="form-grid" id="profile-fields"></div></section><div class="context-note"><span class="context-icon" aria-hidden="true">i</span><p><strong>${escape(t('sameEnvironment'))}</strong> ${escape(t('environmentText'))}</p></div>`;
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
      input.addEventListener('input', () => { state.profile[key] = input.value; save(); });
      label.append(title, input); $('profile-fields').append(label);
    }
  }
  function profileValid() {
    for (const key of ['tester', 'location', 'browser', 'device', 'network', 'vpn']) {
      const v = state.profile[key];
      const max = { browser: 5, device: 5, network: 5, vpn: 3 }[key];
      if (!v.trim() || (max && !validNumber(Number(v), max))) {
        if (state.page !== 0) go(0);
        feedback(t('fieldError', { field: t(key) }), false);
        $('profile-' + key).focus(); return false;
      }
    }
    return true;
  }
  function schematic(kind) {
    const title = ['Linkincrease', cfg.flowSpace, t('steps')[1], t('steps')[2]][kind];
    const contents = kind === 0 ? '<div class="mock-field">Email</div><div class="mock-field">Password</div><div class="mock-action">Log in</div>' :
      kind === 1 ? `<div class="mock-chip">${escape(cfg.flowSpace)}</div>` : kind === 2 ? '<div class="mock-table"><div class="mock-row"></div><div class="mock-row"></div><div class="mock-row"></div><div class="mock-row"></div></div>' : '<div class="mock-columns"><div></div><div></div></div><div class="mock-chip">Milestones / Work orders</div>';
    return `<div class="schematic ${kind === 1 ? 'small' : ''}" aria-hidden="true"><div class="mock-window"><div class="mock-dots"><i></i><i></i><i></i></div><div class="mock-title">${escape(title)}</div>${contents}</div></div>`;
  }
  function figure(kind) {
    const key = ['login', 'flowspace', 'orders', 'detail'][kind];
    const f = el('figure', { className: 'illustration' });
    const src = cfg.screenshots[key];
    if (src) {
      try {
        const url = new URL(src, document.baseURI);
        if (!['http:', 'https:', 'file:'].includes(url.protocol)) throw Error('Image URL');
        const img = el('img', { src: url.href, alt: t('figure')[kind], loading: 'lazy' });
        img.addEventListener('error', () => { img.replaceWith(el('p', { className: 'help', textContent: t('imageFailed') })); });
        f.append(img);
      } catch { f.append(el('p', { textContent: t('imageFailed') })); }
    } else f.innerHTML = schematic(kind);
    f.append(el('figcaption', { textContent: t('figure')[kind] + ' · ' + t(src ? 'screenshot' : 'diagram') }));
    return f;
  }
  function openRouteLink(route) {
    const a = el('a', { className: 'button primary', textContent: t('openRoute', { route }) + ' ↗', target: '_blank', rel: 'noopener noreferrer' });
    const url = new URL(cfg.routes[route]);
    if (url.protocol !== 'https:') throw Error('Business route must use HTTPS');
    a.href = url.href; return a;
  }
  function stepPage(route, step) {
    const instruction = t('instructions')[step].replaceAll('{route}', route).replaceAll('{flow}', cfg.flowSpace).replaceAll('{order}', cfg.orderNumber || t('orderUnknown'));
    $('content').innerHTML = `<div class="stage-badge">${escape(t('route', { route }))} <span>·</span> ${escape(t('step', { step: step + 1 }))}${step === 3 ? ' · ' + escape(t('optional')) : ''}</div><h1>${escape(t('steps')[step])}</h1><p class="intro">${escape(t('stepIntro'))}</p><section class="panel" id="instruction-panel"><p class="step-instructions">${escape(instruction)}</p><div class="step-toolbar" id="route-link"><small>${escape(t('newTab'))}</small></div></section><section class="panel" id="rate-panel"><div class="rating-title"><h2>${escape(t('rate'))}</h2><p>${escape(t('rateHelp'))}</p></div></section>`;
    $('route-link').prepend(openRouteLink(route));
    const kinds = step === 0 ? [0, 1] : step === 1 ? [2] : step === 2 ? [3] : [];
    kinds.forEach(kind => $('instruction-panel').append(figure(kind)));
    $('rate-panel').append(choiceGroup({ title: 'Q' + (7 + step) + ' · ' + t('route', { route }), name: 'rating-' + route + '-' + step,
      options: t('ratings'), selected: state.routes[route].ratings[step], onChange: v => { state.routes[route].ratings[step] = v; } }));
    $('rate-panel').append(el('p', { className: 'subtle', textContent: t('rateNote') }));
    const skip = button(t(step === 3 ? 'skipWork' : 'skip'), () => {
      if (step === 3) state.routes[route].ratings[3] = 5;
      else state.routes[route].ratings = state.routes[route].ratings.map((value, i) => i >= step && value === null ? 5 : value);
      go(route === 'A' ? 5 : 10);
    }, 'ghost');
    $('rate-panel').append(skip);
    if (step < 3) $('rate-panel').append(el('p', { className: 'help', textContent: t('skipHint') }));
  }
  function explorePage(route) {
    $('content').innerHTML = `<div class="stage-badge">${escape(t('route', { route }))} · ${escape(t('optional'))}</div><h1>${escape(t('exploreTitle'))}</h1><p class="intro">${escape(t('exploreIntro'))}</p><section class="panel"><p class="step-instructions">${escape(t('exploreRules'))}</p><div class="step-toolbar" id="explore-link"></div><div id="browse-choices"></div><label class="field" style="margin-top:25px"><span>${escape(t('notes'))}</span><textarea id="route-notes" maxlength="2000" placeholder="${escape(t('notesHint'))}"></textarea></label></section><section class="panel"><div class="panel-heading"><h2>${escape(t('problemTitle'))}</h2></div><ul class="checklist">${t('problems').map(p => `<li>${escape(p)}</li>`).join('')}</ul><p class="help">${escape(t('contact'))}: ${escape(cfg.contact || t('contactUnknown'))}</p></section><div class="context-note"><span class="context-icon" aria-hidden="true">i</span><p><strong>${escape(t('exitTitle'))}.</strong> ${escape(cfg.pageExitInstruction[state.language] || t('exitUnknown'))}</p></div>`;
    $('explore-link').append(openRouteLink(route));
    $('browse-choices').append(choiceGroup({ title: t('browseQuestion'), name: 'browsing-' + route, options: t('browseOpts'), selected: state.routes[route].browsing,
      multi: true, exclusive: [5], onChange: v => { state.routes[route].browsing = v; } }));
    $('route-notes').value = state.routes[route].notes;
    $('route-notes').addEventListener('input', e => { state.routes[route].notes = e.target.value; save(); });
  }
  function comparisonPage() {
    $('content').innerHTML = `<p class="eyebrow">A / B FEEDBACK</p><h1>${escape(t('compareTitle'))}</h1><p class="intro">${escape(t('compareIntro'))}</p><div class="review-grid">${['A', 'B'].map(r => `<div class="review-card"><h3>${escape(t('route', { route: r }))}</h3>${state.routes[r].ratings.map((v, i) => `<div class="review-row"><span>${escape(t('stepResult', { step: i + 1 }))}</span><strong>${escape(v ? t('ratings')[v - 1] : t('untitled'))}</strong></div>`).join('')}</div>`).join('')}</div><section class="panel" id="comparison-questions"></section><section class="panel"><div class="panel-heading"><h2>${escape(t('privacyTitle'))}</h2></div><p class="help">${escape(cfg.privacyNotice[state.language] || t('privacyUnknown'))}</p><p class="help">${escape(t('formScope'))}</p><p class="help">${escape(t('contact'))}: ${escape(cfg.contact || t('contactUnknown'))}</p></section>${!cfg.endpoint ? `<p class="download-hint">${escape(t('localOnly'))}</p>` : ''}`;
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
      if (missing !== -1) { go((route === 'A' ? 1 : 6) + missing); feedback(t('incomplete')); return false; }
    }
    for (const [key, label] of [['faster', 'Q11'], ['differences', 'Q12'], ['problemRoutes', 'Q13'], ['problemTypes', 'Q14']]) {
      if (key === 'problemTypes' && ![2, 3, 4].includes(state.comparison.problemRoutes)) continue;
      const value = state.comparison[key];
      if (value === null || (Array.isArray(value) && !value.length)) { feedback(t('compareError', { field: label })); return false; }
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
    if (!validation()) return;
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
    const submit = $('submit'); if (submit) submit.textContent = t(value ? 'submitting' : 'submit');
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
        cache: 'no-store', body: JSON.stringify(data), signal: controller.signal });
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
    document.title = state.language === 'zh' ? 'Linkincrease · 访问体验问卷' : 'Linkincrease · Access experience survey';
    $('language').textContent = state.language === 'zh' ? 'English' : '中文';
    $('header-note').textContent = t('headerNote');
    $('nav-eyebrow').textContent = t('navEyebrow'); $('nav-title').textContent = t('navTitle');
    $('nav-description').textContent = t('navDescription'); $('sidebar-note').textContent = t('sidebar');
    $('section-label').textContent = t('nav')[groupFor()];
    $('clear').textContent = t('clear');
    $('clear').hidden = succeeded;
    $('integration').hidden = !!cfg.endpoint || succeeded;
    $('feedback').hidden = true;
    const warn = !cfg.endpoint ? t('setup') : missingConfig().length ? t('missing', { fields: missingConfig().map(k => t('configLabels')[k]).join(', ') }) : '';
    $('setup-warning').textContent = warn; $('setup-warning').hidden = !warn || succeeded;
    $('navigation').replaceChildren();
    [0, 1, 6, 11].forEach((page, i) => {
      const nav = el('button', { type: 'button', className: 'nav-item' + (groupFor() === i ? ' active' : ''), disabled: succeeded || busy });
      nav.innerHTML = `<span class="nav-number">${i + 1}</span><span class="nav-text"><strong>${escape(t('nav')[i])}</strong><small>${escape(t('navSub')[i])}</small></span>`;
      if (groupFor() === i) nav.setAttribute('aria-current', 'step');
      nav.addEventListener('click', () => go(page)); $('navigation').append(nav);
    });
    updateProgress();
    $('actions').replaceChildren();
    if (succeeded) {
      $('content').innerHTML = `<section class="panel result-box"><div class="result-icon" aria-hidden="true">✓</div><h1>${escape(t('successTitle'))}</h1><p class="intro">${escape(t('successIntro'))}</p><p class="result-id">${escape(t('successId'))}: ${escape(state.submissionId)}</p></section>`;
      $('draft-status').textContent = ''; $('actions').append(button(t('reset'), reset, 'secondary')); return;
    }
    $('draft-status').textContent = t(storageAvailable ? 'draft' : 'noStorage');
    if (state.page === 0) profilePage();
    else if (stepFor() !== null) stepPage(routeFor(), stepFor());
    else if (state.page === 5 || state.page === 10) explorePage(routeFor());
    else comparisonPage();
    if (state.page > 0) $('actions').append(button('← ' + t('back'), () => go(state.page - 1), 'ghost'));
    const right = el('div', { className: 'action-right' });
    if (state.page === 11) {
      right.append(button(t('download'), download, 'secondary'));
      if (cfg.endpoint) {
        const b = button(t('submit'), submit); b.id = 'submit'; b.disabled = !!missingConfig().length; right.append(b);
      }
    } else {
      const label = state.page === 0 ? 'readyAction' : state.page === 5 ? 'toB' : state.page === 10 ? 'review' : 'next';
      right.append(button(t(label) + ' →', () => {
        if (state.page === 0 && !profileValid()) return;
        const step = stepFor();
        if (step !== null && state.routes[routeFor()].ratings[step] === null) { feedback(t('rateError')); return; }
        go(state.page + 1);
      }));
    }
    $('actions').append(right);
  }
  function reset() {
    if (busy) return;
    if (!succeeded && !window.confirm(t('clearConfirm'))) return;
    const language = state.language;
    state = fresh(); state.language = language;
    succeeded = false;
    try { sessionStorage.removeItem(storageKey); } catch { storageAvailable = false; }
    go(0);
  }
  $('clear').addEventListener('click', reset);
  $('language').addEventListener('click', () => { if (busy) return; state.language = state.language === 'en' ? 'zh' : 'en'; save(); render(); });
  render(); save();
})();
