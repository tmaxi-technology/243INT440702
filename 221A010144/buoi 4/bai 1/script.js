document.addEventListener('DOMContentLoaded', () => {
    // Lấy tất cả các phần tử cần thiết bằng ID của chúng
    const display = document.getElementById('display');
    const buttons = document.getElementById('buttons-grid');

    let currentInput = '0'; // Lưu trữ số hiện tại đang được nhập hoặc kết quả
    let operator = null;     // Lưu trữ toán tử đã chọn (+, -, *, /)
    let firstOperand = null; // Lưu trữ số đầu tiên cho các phép tính
    let waitingForSecondOperand = false; // Cờ báo hiệu nếu chúng ta đã sẵn sàng cho số thứ hai
    let memory = 0;          // Lưu trữ giá trị trong bộ nhớ máy tính

    // Hàm cập nhật hiển thị
    function updateDisplay() {
        // Giới hạn độ dài hiển thị để tránh tràn, hoặc xử lý bằng phông chữ nhỏ hơn
        if (currentInput.length > 12 && !currentInput.includes('e')) { // Tránh cắt bỏ ký hiệu khoa học
            display.textContent = parseFloat(currentInput).toPrecision(10).replace(/\.?0+$/, ''); // Định dạng để có độ chính xác
        } else {
            display.textContent = currentInput;
        }
    }

    // Hàm xử lý các lần nhấp số
    function inputNumber(num) {
        if (waitingForSecondOperand === true) {
            currentInput = num;
            waitingForSecondOperand = false;
        } else {
            // Ngăn chặn nhiều số 0 ở đầu trừ khi đó là số thập phân
            if (currentInput === '0' && num !== '.') {
                currentInput = num;
            } else {
                currentInput += num;
            }
        }
        updateDisplay();
    }

    // Hàm xử lý dấu thập phân
    function inputDecimal(dot) {
        if (waitingForSecondOperand === true) {
            currentInput = '0.';
            waitingForSecondOperand = false;
            updateDisplay();
            return;
        }
        if (!currentInput.includes(dot)) {
            currentInput += dot;
            updateDisplay();
        }
    }

    // Hàm xử lý các thao tác xóa (C và CE)
    function clearCalculator(type) {
        if (type === 'C') { // Xóa tất cả
            currentInput = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            // Không xóa bộ nhớ ở đây, "C" thường chỉ xóa phép tính hiện tại
            // Để xóa bộ nhớ, cần nút "MC"
        } else if (type === 'CE') { // Xóa mục nhập (đầu vào hiện tại)
            currentInput = '0';
        }
        updateDisplay();
    }

    // Hàm xử lý phím lùi
    function handleBackspace() {
        if (currentInput === 'Error') { // Nếu hiển thị là 'Error', hãy xóa hoàn toàn
            clearCalculator('C');
            return;
        }
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }

    // Hàm xử lý các toán tử
    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
            // Nếu một toán tử đã được nhấn, và chúng ta đang chờ toán hạng thứ hai,
            // điều đó có nghĩa là người dùng đang xâu chuỗi các phép toán mà không nhấn dấu bằng.
            // Chỉ cần cập nhật toán tử cho phép tính tiếp theo.
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            // Đây là số đầu tiên trong phép tính
            firstOperand = inputValue;
        } else if (operator) {
            // Thực hiện phép tính trước đó nếu có một toán tử tồn tại
            const result = calculate(firstOperand, inputValue, operator);
            currentInput = String(result);
            firstOperand = result; // Kết quả trở thành toán hạng đầu tiên mới để xâu chuỗi
            // Xử lý các lỗi tiềm ẩn như chia cho 0 hoặc các phép toán không hợp lệ
            if (isNaN(result) || !isFinite(result)) {
                currentInput = 'Error';
            }
        }

        waitingForSecondOperand = true; // Chuẩn bị cho số tiếp theo
        operator = nextOperator;
        updateDisplay();
    }

    // Logic tính toán
    function calculate(firstNum, secondNum, op) {
        switch (op) {
            case '+':
                return firstNum + secondNum;
            case '-':
                return firstNum - secondNum;
            case '×': // Sử dụng '×' cho phép nhân như trong văn bản nút
                return firstNum * secondNum;
            case '÷': // Sử dụng '÷' cho phép chia như trong văn bản nút
                if (secondNum === 0) {
                    return 'Error'; // Tránh chia cho 0
                }
                return firstNum / secondNum;
            case '%':
                // Phần trăm có thể hoạt động theo nhiều cách. Ví dụ:
                // Nếu 100 + 10%, thì 10% của 100 là 10, kết quả là 110.
                // Nếu 50 % 10, thì 50 nhân với 10%.
                // Với máy tính cơ bản, ta sẽ làm 50 * (10/100) = 5.
                // Nếu bạn muốn 100 + 10% = 110, logic sẽ phức tạp hơn.
                return firstNum * (secondNum / 100);
            default:
                return secondNum; // Điều này xảy ra khi toán tử là null hoặc không xác định
        }
    }

    // Hàm cho các phép toán đặc biệt (1/x, x², ²√x, +/-)
    function handleSpecialOperation(opType) {
        let value = parseFloat(currentInput);
        if (isNaN(value)) return; // Không làm gì nếu currentInput không phải là số

        switch (opType) {
            case '1/x':
                if (value !== 0) {
                    currentInput = String(1 / value);
                } else {
                    currentInput = 'Error'; // Xử lý chia cho 0
                }
                break;
            case 'x²':
                currentInput = String(value * value);
                break;
            case '²√x':
                if (value >= 0) {
                    currentInput = String(Math.sqrt(value));
                } else {
                    currentInput = 'Error'; // Xử lý căn bậc hai của số âm
                }
                break;
            case '+/-': // Chuyển đổi dấu (âm/dương)
                currentInput = String(-value);
                break;
        }
        updateDisplay();
        // Sau một phép toán đặc biệt, giả sử chúng ta đã sẵn sàng cho đầu vào mới
        waitingForSecondOperand = true;
    }

    // Hàm xử lý các chức năng bộ nhớ (MC, MR, M+, M-, MS)
    function handleMemory(memOp) {
        switch (memOp) {
            case 'MC': // Xóa bộ nhớ (Memory Clear)
                memory = 0;
                break;
            case 'MR': // Gọi bộ nhớ (Memory Recall)
                currentInput = String(memory);
                waitingForSecondOperand = true; // Sau khi gọi bộ nhớ, chúng ta sẵn sàng cho toán tử/số mới
                break;
            case 'M+': // Thêm vào bộ nhớ (Memory Add)
                memory += parseFloat(currentInput);
                break;
            case 'M-': // Trừ khỏi bộ nhớ (Memory Subtract)
                memory -= parseFloat(currentInput);
                break;
            case 'MS': // Lưu vào bộ nhớ (Memory Store)
                memory = parseFloat(currentInput);
                waitingForSecondOperand = true; // Sau khi lưu vào bộ nhớ, chúng ta sẵn sàng cho toán tử/số mới
                break;
        }
        updateDisplay(); // Cập nhật hiển thị (nếu MR được nhấn)
        console.log(`Memory value: ${memory}`); // Để gỡ lỗi
    }


    // Bộ lắng nghe sự kiện cho tất cả các lần nhấp nút
    buttons.addEventListener('click', (event) => {
        const target = event.target; // Phần tử nút đã nhấp
        if (!target.matches('button')) return; // Đảm bảo một nút đã được nhấp

        const buttonId = target.id;
        const buttonText = target.textContent;

        // Xử lý các nút số
        if (['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].includes(buttonId)) {
            inputNumber(buttonText);
            return;
        }

        // Xử lý nút thập phân
        if (buttonId === 'decimal') {
            inputDecimal(buttonText);
            return;
        }

        // Xử lý các nút xóa
        if (buttonId === 'c' || buttonId === 'ce') {
            clearCalculator(buttonText);
            return;
        }

        // Xử lý nút lùi
        if (buttonId === 'backspace') {
            handleBackspace();
            return;
        }

        // Xử lý nút bằng
        if (buttonId === 'equals') {
            if (firstOperand === null || operator === null) {
                // Nếu không có toán hạng hoặc toán tử, không có gì để tính
                return;
            }
            const inputValue = parseFloat(currentInput);
            const result = calculate(firstOperand, inputValue, operator);

            if (isNaN(result) || !isFinite(result)) {
                currentInput = 'Error';
            } else {
                currentInput = String(result);
            }

            firstOperand = null; // Đặt lại cho phép tính mới
            operator = null;     // Đặt lại toán tử
            waitingForSecondOperand = false; // Đặt lại cờ
            updateDisplay();
            return;
        }

        // Xử lý các phép toán đặc biệt (1/x, x², ²√x, +/-)
        if (['one-over-x', 'x-squared', 'square-root', 'plus-minus'].includes(buttonId)) {
            handleSpecialOperation(buttonText);
            return;
        }

        // Xử lý các nút toán tử
        if (['add', 'subtract', 'multiply', 'divide', 'percent'].includes(buttonId)) {
            handleOperator(buttonText);
            return;
        }

        // Xử lý các chức năng bộ nhớ (MC, MR, M+, M-, MS)
        if (['mc', 'mr', 'm-plus', 'm-minus', 'ms'].includes(buttonId)) {
            handleMemory(buttonText);
            return;
        }
    });

    // Cập nhật hiển thị ban đầu
    updateDisplay();
});