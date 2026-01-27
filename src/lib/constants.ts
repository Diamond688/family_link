import { User, Memory, Profile } from '@/types';

export const MOCK_ME: User = {
  id: 'me',
  name: '莎拉·史密斯',
  role: '管理员',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_R0-TlYxChl5TzlJnYr8pBlLNf8rgIfBPk8zMCqLqowVPGNCRWfmDqQMeRUuH-fW9So_cysUQehptGgQ1mRUlcCQv-ePgYdER_aqWHZD_3I8SHrtYL3LDXD7rJLyV2owGLFmWjPXDrWkYa-wIvk0Zp-w8dev9N6QvOil3HZGR4K4f4WembItCMYIbVHtO-qApjadIWKbVsN_BYR6YRu2PX6L6mjONR42xgLmbDkEYTdrDFQ8ycA77JlhSDKXVD9U-lnH-hzZ49A',
  isMe: true,
  permission: '编辑'
};

export const MOCK_FAMILY: User[] = [
  MOCK_ME,
  {
    id: 'f1',
    name: '迈克尔·史密斯',
    role: '父亲',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9JrX1WoxV5jlFCHgvANIuzWjipyDlLRjhEStvTdWbLBp750Pss_z7HKrNwT8yVuWf3q4jJey1GA16rJzHnxGozdCLxz1Y6ze6MaGNZa2IgPN13FCZmCS0MQLH_BA9aZh9Qe2082xc3myzGl8M4D5BOBO38RMn-L9K2de01G0zDOkKJGSzkZYNmzziteolTQCP6DPjFb1SY7UzScTg2oYYwljT3M069HNNswka1NV5yglQv22NgGVbIL3qKeDg5Z0HRuAlIyafl_k',
    permission: '仅浏览'
  },
  {
    id: 'f2',
    name: '艾米丽·戴维斯',
    role: '表亲',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfhBELjbKGr-ee1BvUE2v0JnyG5o5BBYsktwL5HJtdHUOwDFhcDBurUgQEJzv81VlrsFErOAY8OOUFAlQfRdMTWc173mCsjNIoXWMkCTAMTDGKd8sMwL4nWqZcMnR5uRyk4jVqMacDRmfMMBkBExKfDyN_6qhm5v1BtQDZxt2HyvqwHMIdevBzjRmJTm_yuO1qG8uhKGl3yaQCV8rh-yqCrSmQ3w86xqv5YdNN8dRPMrwHxpJ0oeytgiEyRu43FBOWqWKNfMGp-hc',
    permission: '编辑'
  }
];

export const MOCK_MEMORIES: Memory[] = [
  {
    id: 'm1',
    title: '爷爷的八十大寿',
    type: 'album',
    dateLabel: '2天前 • 相册',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGc5Bq_B8zfWyMzDyvTSv9sI91aRttWbcoqBK7Giwr1EeRyL-u_wYmu-ZcbLYIVRtrSBHvXujETJeUYtP3J8Y6FUtYJLHjm6mTMPWgGKvi98oIJz2PcLRPjwCIjJ_wYcnqDmfNn1wKFrM2Y5EZCgC4EJV8wouaqWq3kAFWKeb0LHO2fXQVXpSFymAhGpZNeLwyGU5BdzX0_2k0zLxJuf2cd_NWX4qoMrWyr4dImhZ3McwVO8mSlFmHdWNipz9nbS191uurauUzPYU',
    extraCount: 12,
    description: '这是大家聚集在后院给爷爷惊喜的那一刻。他原本以为我们只是吃个便饭，结果整个街坊邻居都来了。',
    location: '伊利诺伊州 芝加哥',
    uploadDate: '2023年10月12日'
  },
  {
    id: 'm2',
    title: '家族大迁徙的故事',
    type: 'audio',
    dateLabel: '1周前 • 录音',
    duration: '02:45'
  },
  {
    id: 'm3',
    title: '小Leo迈出的第一步',
    type: 'video',
    dateLabel: '2周前 • 视频',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfHurBIGmRP3f6rhEHBtMVNn55497s7D6xBP-8enfTAVEutltLDznL-8cdHB3S4bAdsNPjTHShIM_hCpmE2WB5qgtoY0Xz2JXQye8KtCNDXj8cKFXt84D9ZL1LehN2Psiv9IjYSH_J1Kyl5ixALnl1z7qy0adoN5omvnTRveo0a1qixLIiKzbcEJwDZX4t-sKYrtzPr0rGhofvV7wi3tDmkujaUkVnPD4r9i6RV60BuQrfXxIid-OUf96sR5W2otIJzU29dZWoS0E',
    duration: '0:42'
  }
];

export const MOCK_GRANDPA_PROFILE: Profile = {
  id: 'robert',
  name: '罗伯特·"爷爷"·米勒',
  lifespan: '1945 – 2010',
  role: '祖父',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmmtDc9d1Vl8WGs_SHwJ9RniRIzHssqFDqXfxOkFuvZuiqlZtoukLSUDC6PSXn92jE3dogruCNupaAcqLxUwaL9XuS9Yl0uC-Hgs3iym9whH7auMaSr8pQKzFsK9qbEoB2lioN-3t2Kt69QLMxipAGlsUffvE5KY1l8krmi6S6fWXQD0_7FEggYhKWZUZdx5YpywPW_xKkJlajJIAAJ0PtaMc90kQ4G5YMJIwCWeohB1UHt_JWHMi9iwV-gzRdc2XCOZApsY2iuHI',
  cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEzSt3UVb5UedwBWtU38vz7OniXu0yskCbKDY_xHmiMqcVAFWSumB5Q5RXZlH6K0L6yaSN8bil52l7fRCQQGDasM_Kr_NnGFcx6XLrUGStQr2F1Q06e3XEv0h6jHrDQePSBIc8e4H0JmY_9CCtpO63evP_w8sqboTXnSgXWGcvjs0yzr3h2dEPtbOn_flvAuBnhcOyxRau9weWYcLfXykWV2nqOwjvbd3jY9-PtdYCGS67i48WvlwHepGh_ZaTpzoXG26Yd03tAlQ'
};
