// 焦点图轮播功能
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.hero-dot');
        this.prevBtn = document.querySelector('.hero-prev');
        this.nextBtn = document.querySelector('.hero-next');
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // 绑定事件
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // 绑定圆点点击事件
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // 自动播放
        this.startAutoPlay();
        
        // 鼠标悬停时暂停自动播放
        const heroSection = document.querySelector('.hero-section');
        heroSection.addEventListener('mouseenter', () => this.stopAutoPlay());
        heroSection.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    goToSlide(index) {
        // 移除当前活动状态
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // 设置新的活动状态
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5秒切换一次
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// 导航菜单交互
class Navigation {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.init();
    }
    
    init() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveItem(item);
            });
        });
    }
    
    setActiveItem(activeItem) {
        this.navItems.forEach(item => {
            item.classList.remove('active');
        });
        activeItem.classList.add('active');
    }
}

// 搜索功能
class Search {
    constructor() {
        this.searchBtn = document.querySelector('.search-btn');
        this.init();
    }
    
    init() {
        this.searchBtn.addEventListener('click', () => {
            this.showSearchModal();
        });
    }
    
    showSearchModal() {
        // 创建搜索模态框
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <h3>搜索新闻</h3>
                    <button class="search-close">&times;</button>
                </div>
                <div class="search-modal-body">
                    <input type="text" placeholder="请输入关键词..." class="search-input">
                    <button class="search-submit">搜索</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定关闭事件
        const closeBtn = modal.querySelector('.search-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // 点击模态框外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // 搜索输入框聚焦
        const searchInput = modal.querySelector('.search-input');
        searchInput.focus();
    }
}

// 登录功能
class Login {
    constructor() {
        this.loginBtn = document.querySelector('.login-btn');
        this.init();
    }
    
    init() {
        this.loginBtn.addEventListener('click', () => {
            this.showLoginModal();
        });
    }
    
    showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'login-modal';
        modal.innerHTML = `
            <div class="login-modal-content">
                <div class="login-modal-header">
                    <h3>用户登录</h3>
                    <button class="login-close">&times;</button>
                </div>
                <div class="login-modal-body">
                    <form class="login-form">
                        <div class="form-group">
                            <label>用户名</label>
                            <input type="text" placeholder="请输入用户名" required>
                        </div>
                        <div class="form-group">
                            <label>密码</label>
                            <input type="password" placeholder="请输入密码" required>
                        </div>
                        <button type="submit" class="login-submit">登录</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定关闭事件
        const closeBtn = modal.querySelector('.login-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // 点击模态框外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // 表单提交
        const form = modal.querySelector('.login-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('登录功能开发中...');
        });
    }
}

// 添加模态框样式
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .search-modal,
        .login-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        }
        
        .search-modal-content,
        .login-modal-content {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .search-modal-header,
        .login-modal-header {
            padding: 20px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .search-modal-header h3,
        .login-modal-header h3 {
            margin: 0;
            color: #2c3e50;
        }
        
        .search-close,
        .login-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .search-modal-body,
        .login-modal-body {
            padding: 20px;
        }
        
        .search-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
            margin-bottom: 15px;
        }
        
        .search-submit {
            background: #e67e22;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }
        
        .login-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .form-group label {
            font-weight: 500;
            color: #2c3e50;
        }
        
        .form-group input {
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
        }
        
        .login-submit {
            background: #2c3e50;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
        }
        
        .login-submit:hover {
            background: #e67e22;
        }
    `;
    document.head.appendChild(style);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加模态框样式
    addModalStyles();
    
    // 初始化各个功能模块
    new HeroSlider();
    new Navigation();
    new Search();
    new Login();
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 添加滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
}); 