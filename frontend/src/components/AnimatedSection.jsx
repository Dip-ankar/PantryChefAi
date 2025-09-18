import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const sectionVariant = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  hidden: { opacity: 0, y: 50 },
};

const AnimatedSection = ({ children, id, className }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.1, 
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={sectionVariant}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;