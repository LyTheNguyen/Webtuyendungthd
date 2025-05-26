import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

// Mock data for fallback if API fails
const MOCK_JOBS = {
  data: [
    {
      id: 1,
      tenvitri: 'Kỹ sư phát triển phần mềm',
      diachi: 'Hà Nội',
      loaivitri: 'Khối kỹ thuật',
      thoigianlamviec: 'Toàn thời gian',
      sttvitri: 5,
      motacongviec: '- Design and execute data-driven growth plans to boost user adoption, retention, and engagement for key promotional products and services.\n- Identify market trends, user behaviors, and competitive insights to develop actionable growth opportunities.\n- Lead GTM strategies for new feature rollouts and campaign launches.\n- Coordinate with cross-functional teams and business units to ensure alignment in execution and communication.',
      yeucaucongviec: '- Bachelor\'s degree in Marketing, Business, Economics or a related field. MBA is a plus.\n- 5+ years of experience in growth, product marketing, or digital business strategy.\n- Proven track record in leading growth initiatives in high-growth environments, ideally B2C or digital platforms.\n- Strong business acumen with an analytical mindset; comfortable working with data to inform decisions.\n- Excellent communication and stakeholder management skills.\n- Experience in fintech, promotions, e-commerce or platform-based models is preferred.\n- Familiarity with performance tracking tools, customer research, and agile execution.',
      quyenloi: '- Tham gia các hoạt động văn chơi: đá bóng, chơi game, team, du lịch và team building\n- Nhận thưởng từ các dự án, quà tặng nhớ dịp lễ, Tết...\n- Hỗ trợ đóng đầu môc thực tập\n- Có hỗ trợ thành phần viện chiến thực sau kỳ thực tập mà không cần phải qua vòng or tuyển và thời gian thử việc\n- Được làm việc với các doanh nghiệp, tập đoàn trong và ngoài nước ở nhiều lĩnh vực khác nhau\n- Cơ hội trải nghiệm thực tập nên đạt được kết quả tốt trong thời gian đào tạo\n- Được tham gia các khóa huấn luyện, đào tạo nâng cao kỹ năng, nghiệp vụ từ các hãng công nghệ',
      thongtinlienhe: '- Liên hệ: Trịnh Bảo Long\n- Email: jobs@thdcybersecurity.com\n- Số điện thoại: (+84) 988 471 696'
    },
    {
      id: 2,
      tenvitri: 'Chuyên viên kinh doanh',
      diachi: 'Hồ Chí Minh',
      loaivitri: 'Khối Kinh Doanh',
      thoigianlamviec: 'Toàn thời gian',
      sttvitri: 3,
      motacongviec: '- Tìm kiếm và phát triển khách hàng mới\n- Giới thiệu sản phẩm, dịch vụ của công ty tới khách hàng tiềm năng\n- Xây dựng và duy trì mối quan hệ với khách hàng\n- Đàm phán và ký kết hợp đồng kinh doanh',
      yeucaucongviec: '- Tốt nghiệp Đại học chuyên ngành Kinh tế, Quản trị Kinh doanh hoặc các ngành liên quan\n- Có ít nhất 2 năm kinh nghiệm trong lĩnh vực kinh doanh\n- Kỹ năng giao tiếp và đàm phán tốt\n- Chủ động, năng động và có tinh thần trách nhiệm cao\n- Khả năng làm việc độc lập và theo nhóm',
      quyenloi: '- Mức lương cạnh tranh + hoa hồng theo doanh số\n- Được đào tạo về sản phẩm và kỹ năng bán hàng\n- Cơ hội thăng tiến trong công ty\n- Chế độ bảo hiểm đầy đủ theo quy định\n- Môi trường làm việc năng động, chuyên nghiệp',
      thongtinlienhe: '- Liên hệ: Nguyễn Văn An\n- Email: tuyendung@thdcybersecurity.com\n- Số điện thoại: (+84) 987 654 321'
    }
  ]
};

export const fetchJobs = async () => {
  try {
    console.log('Calling API to fetch all jobs...');
    const response = await axios.get(`${API_URL}/vitrilamviets`);
    console.log('API response success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    console.log('Using mock job data as fallback');
    // Return mock data instead of throwing to prevent breaking the UI
    return MOCK_JOBS;
  }
};

export const fetchJobDetails = async (id) => {
  try {
    console.log(`Fetching job details for ID: ${id}`);
    const response = await axios.get(`${API_URL}/vitrilamviets/${id}`);
    console.log('Job details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    
    // Try to find job in mock data
    const job = MOCK_JOBS.data.find(job => job.id === parseInt(id));
    if (job) {
      console.log('Using mock job data for details');
      return { data: job };
    }
    
    throw error;
  }
}; 