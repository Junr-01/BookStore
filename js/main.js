// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const enterBookstoreBtn = document.getElementById('enterBookstoreBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // 显示登录模态框
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 显示注册模态框
    registerBtn.addEventListener('click', function() {
        registerModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // 关闭模态框
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 登录表单提交
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // 简单的表单验证
        if (!email || !password) {
            showNotification('请填写所有必填字段', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('请输入有效的邮箱地址', 'error');
            return;
        }
        
        // 模拟登录成功
        showNotification('登录成功！正在跳转...', 'success');
        
        // 3秒后关闭模态框
        setTimeout(() => {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            loginForm.reset();
            
            // 更新导航栏显示用户已登录
            updateNavbarForLoggedInUser(email);
        }, 2000);
    });

    // 注册表单提交
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // 表单验证
        if (!name || !email || !password || !confirmPassword) {
            showNotification('请填写所有必填字段', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('请输入有效的邮箱地址', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('密码长度至少为6位', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('两次输入的密码不一致', 'error');
            return;
        }
        
        // 模拟注册成功
        showNotification('注册成功！欢迎加入书香书城', 'success');
        
        // 3秒后关闭模态框
        setTimeout(() => {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            registerForm.reset();
            
            // 自动登录
            updateNavbarForLoggedInUser(name);
        }, 2000);
    });

    // 进入书城按钮点击事件
    enterBookstoreBtn.addEventListener('click', function() {
        showNotification('正在进入书城...', 'info');
        
        // 模拟加载
        enterBookstoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
        enterBookstoreBtn.disabled = true;
        
        // 3秒后跳转（实际项目中这里应该是真实跳转）
        setTimeout(() => {
            showNotification('欢迎来到书城！', 'success');
            enterBookstoreBtn.innerHTML = '<i class="fas fa-store"></i> 立即探索';
            enterBookstoreBtn.disabled = false;
            
            // 这里可以添加实际的书城页面跳转逻辑
            // window.location.href = '/bookstore.html';
        }, 2000);
    });

    // 浏览分类按钮点击事件
    const browseBtn = document.getElementById('browseBtn');
    if (browseBtn) {
        browseBtn.addEventListener('click', function() {
            showNotification('正在加载图书分类...', 'info');
            
            // 模拟加载
            browseBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
            browseBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('已跳转到图书分类页面', 'success');
                browseBtn.innerHTML = '<i class="fas fa-compass"></i> 浏览分类';
                browseBtn.disabled = false;
            }, 1500);
        });
    }

    // 搜索功能
    const searchBtn = document.getElementById('searchBtn');
    const heroSearchBtn = document.getElementById('heroSearchBtn');
    const searchInput = document.getElementById('searchInput');
    const heroSearchInput = document.getElementById('heroSearchInput');

    function handleSearch(inputElement) {
        const query = inputElement.value.trim();
        if (!query) {
            showNotification('请输入搜索关键词', 'error');
            return;
        }
        
        showNotification(`正在搜索: "${query}"`, 'info');
        
        // 模拟搜索
        setTimeout(() => {
            showNotification(`找到 128 本与 "${query}" 相关的图书`, 'success');
            inputElement.value = '';
        }, 1500);
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => handleSearch(searchInput));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch(searchInput);
        });
    }

    if (heroSearchBtn && heroSearchInput) {
        heroSearchBtn.addEventListener('click', () => handleSearch(heroSearchInput));
        heroSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch(heroSearchInput);
        });
    }

    // 购物车功能
    const cartBtn = document.getElementById('cartBtn');
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            showNotification('正在打开购物车...', 'info');
            // 实际项目中这里应该跳转到购物车页面
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookCard = this.closest('.book-card');
            const bookTitle = bookCard.querySelector('.book-title').textContent;
            const currentCount = parseInt(cartCount.textContent);
            
            // 更新购物车数量
            cartCount.textContent = currentCount + 1;
            cartCount.style.animation = 'bounce 0.5s';
            
            // 显示添加成功通知
            showNotification(`已添加 "${bookTitle}" 到购物车`, 'success');
            
            // 添加动画效果
            this.innerHTML = '<i class="fas fa-check"></i> 已添加';
            this.style.background = '#2ecc71';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cart-plus"></i> 加入购物车';
                this.style.background = '';
                this.disabled = false;
            }, 2000);
        });
    });

    // 收藏夹功能
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            showNotification('正在打开收藏夹...', 'info');
        });
    }

    // 通知功能
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('您有 3 条未读通知', 'info');
            // 实际项目中这里应该显示通知列表
        });
    }

    // 导航菜单点击效果
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.classList.contains('active')) return;
            
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const pageName = this.textContent.trim();
            showNotification(`正在跳转到 ${pageName} 页面...`, 'info');
        });
    });

    // 添加动画效果到卡片
    const introCards = document.querySelectorAll('.intro-card');
    introCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 图书卡片悬停效果
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 特色功能卡片悬停效果
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 添加滚动动画
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // 工具函数：验证邮箱格式
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 工具函数：显示通知
    function showNotification(message, type = 'info') {
        // 移除现有的通知
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        // 添加动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // 工具函数：获取通知图标
    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'info': return 'fa-info-circle';
            default: return 'fa-info-circle';
        }
    }

    // 工具函数：获取通知颜色
    function getNotificationColor(type) {
        switch(type) {
            case 'success': return 'linear-gradient(135deg, #2ecc71, #27ae60)';
            case 'error': return 'linear-gradient(135deg, #e74c3c, #c0392b)';
            case 'info': return 'linear-gradient(135deg, #3498db, #2980b9)';
            default: return 'linear-gradient(135deg, #3498db, #2980b9)';
        }
    }

    // 更新导航栏显示已登录用户
    function updateNavbarForLoggedInUser(username) {
        const authButtons = document.querySelector('.auth-buttons');
        authButtons.innerHTML = `
            <div class="user-info">
                <i class="fas fa-user-circle"></i>
                <span>欢迎，${username}</span>
            </div>
            <button class="btn btn-logout" id="logoutBtn">
                <i class="fas fa-sign-out-alt"></i> 退出
            </button>
        `;
        
        // 添加退出登录功能
        document.getElementById('logoutBtn').addEventListener('click', function() {
            showNotification('已退出登录', 'info');
            setTimeout(() => {
                location.reload(); // 刷新页面恢复原始状态
            }, 1500);
        });
        
        // 添加用户信息样式
        const userInfoStyle = document.createElement('style');
        userInfoStyle.textContent = `
            .user-info {
                display: flex;
                align-items: center;
                gap: 10px;
                color: #2c3e50;
                font-weight: 500;
                padding: 8px 16px;
                background: rgba(52, 152, 219, 0.1);
                border-radius: 20px;
            }
            
            .user-info i {
                font-size: 1.2rem;
                color: #3498db;
            }
            
            .btn-logout {
                background: transparent;
                color: #e74c3c;
                border: 2px solid #e74c3c;
            }
            
            .btn-logout:hover {
                background: #e74c3c;
                color: white;
            }
        `;
        document.head.appendChild(userInfoStyle);
    }

    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // 添加键盘快捷键支持
    document.addEventListener('keydown', function(event) {
        // ESC键关闭所有模态框
        if (event.key === 'Escape') {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Ctrl+L 快速登录
        if (event.ctrlKey && event.key === 'l') {
            event.preventDefault();
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        
        // Ctrl+R 快速注册
        if (event.ctrlKey && event.key === 'r') {
            event.preventDefault();
            registerModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });

    // 控制台欢迎信息
    console.log('%c📚 欢迎来到书香书城！', 'color: #3498db; font-size: 16px; font-weight: bold;');
    console.log('%c探索知识的海洋，发现阅读的乐趣', 'color: #7f8c8d; font-size: 14px;');
});