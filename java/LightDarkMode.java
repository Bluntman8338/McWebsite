import javax.swing.*;
import java.awt.*;

public class LightDarkMode extends JPanel {

    private int x = 0;
    private boolean movingRight = true;

    public LightDarkMode() {
        Timer timer = new Timer(20, e -> {
            if (movingRight) {
                x += 2;
                if (x >= 200) movingRight = false;
            } else {
                x -= 2;
                if (x <= 0) movingRight = true;
            }
            repaint();
        });
        timer.start();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);

        // Background
        g.setColor(Color.BLACK);
        g.fillRect(0, 0, getWidth(), getHeight());

        // Draw icon (sun/moon)
        g.setColor(Color.YELLOW);
        g.fillOval(x, 50, 50, 50);
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Light/Dark Mode");
        LightDarkMode panel = new LightDarkMode();
        frame.add(panel);
        frame.setSize(400, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}
